import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createNodesFromElements, generateLines, IConnection, INode } from './lines';
import SvgLayer, { ILine } from './SvgLayer';
import style from './style.module.css';
import { LinesUpdateContext, WorkflowContext, WorkflowEvents } from './svgContext';
import EE from 'eventemitter3';

interface Props extends PropsWithChildren {
    connections: IConnection[];
    columns?: number;
    ignoredColumns?: number;
}

export default function WorkflowLayout({ children, connections, columns, ignoredColumns }: Props) {
    const [lines, setLines] = useState<ILine[]>([]);
    const wkspaceRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver>();
    const mutObserver = useRef<MutationObserver>();
    const elementsRef = useRef<Map<string, Set<HTMLElement>>>(new Map());
    const contextRef = useRef<WorkflowContext>({
        registerElement: () => {
            return () => {};
        },
        updateLines: () => {},
        elements: elementsRef.current,
        events: new EE<WorkflowEvents>(),
    });
    const rafId = useRef<number | null>(null);

    if (!observer.current) {
        observer.current = new ResizeObserver(() => {
            contextRef.current.updateLines();
        });
    }

    contextRef.current.registerElement = (id: string, element: HTMLElement) => {
        if (!elementsRef.current.has(id)) {
            elementsRef.current.set(id, new Set());
        }
        elementsRef.current.get(id)?.add(element);
        if (observer.current) {
            observer.current.observe(element);
        }
        contextRef.current.events.emit('elementRegistered', id, element);
        contextRef.current.updateLines();
        return () => {
            elementsRef.current.get(id)?.delete(element);
            if (elementsRef.current.get(id)?.size === 0) {
                elementsRef.current.delete(id);
            }
            if (observer.current) {
                observer.current.unobserve(element);
            }
            contextRef.current.events.emit('elementUnregistered', id, element);
            contextRef.current.updateLines();
        };
    };

    contextRef.current.updateLines = () => {
        if (rafId.current !== null) return;

        rafId.current = requestAnimationFrame(() => {
            try {
                const nodes = new Map<string, INode[]>();
                for (const [id, elements] of elementsRef.current.entries()) {
                    const currentNodes = createNodesFromElements(Array.from(elements));
                    nodes.set(id, currentNodes);
                }
                const lines = generateLines(nodes, connections);

                setLines(lines);
                contextRef.current.events.emit('linesUpdated', lines, connections);
            } finally {
                rafId.current = null;
            }
        });
    };

    useEffect(() => {
        if (wkspaceRef.current) {
            observer.current?.observe(wkspaceRef.current);

            const fMutation = (mutations: MutationRecord[]) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-active') {
                        contextRef.current.updateLines();
                        break;
                    }
                }
            };

            mutObserver.current = new MutationObserver(fMutation);
            mutObserver.current.observe(wkspaceRef.current, {
                attributes: true,
                subtree: true,
                attributeFilter: ['data-active'],
            });

            contextRef.current.updateLines();

            return () => {
                observer.current?.disconnect();
                if (rafId.current !== null) {
                    cancelAnimationFrame(rafId.current);
                }

                mutObserver.current?.disconnect();
            };
        }
    }, []);

    return (
        <div className={style.workspace}>
            <LinesUpdateContext.Provider value={contextRef.current}>
                <div
                    className={style.container}
                    ref={wkspaceRef}
                    style={{
                        gridTemplateColumns: `repeat(${
                            columns !== undefined
                                ? columns
                                : Array.isArray(children)
                                  ? children.filter((c) => !!c).length - (ignoredColumns || 0)
                                  : 1
                        }, max-content)`,
                    }}
                >
                    <SvgLayer lines={lines} />
                    {children}
                </div>
            </LinesUpdateContext.Provider>
        </div>
    );
}
