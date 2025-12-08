import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { extractNodesFromElements, generateLines, IConnection } from './lines';
import SvgLayer, { ILine } from './SvgLayer';
import style from './style.module.css';
import { LinesUpdateContext } from './svgContext';

interface Props extends PropsWithChildren {
    connections: IConnection[];
    columns?: number;
    ignoredColumns?: number;
}

export default function WorkflowLayout({ children, connections, columns, ignoredColumns }: Props) {
    const [lines, setLines] = useState<ILine[]>([]);
    const wkspaceRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver>();

    const forceUpdateLines = useCallback(() => {
        const nodes = extractNodesFromElements(wkspaceRef.current as HTMLElement);
        const lines = generateLines(nodes, connections);

        setLines(lines);
    }, [connections]);

    useEffect(() => {
        if (wkspaceRef.current) {
            const f = () => {
                if (wkspaceRef.current) {
                    forceUpdateLines();
                }
            };
            observer.current = new ResizeObserver(f);
            observer.current.observe(wkspaceRef.current);
            const children = wkspaceRef.current.children;
            if (children) {
                for (let i = 0; i < children.length; ++i) {
                    const child = children[i];
                    observer.current.observe(child);
                }
            }

            f();

            return () => {
                observer.current?.disconnect();
            };
        }
    }, [connections, forceUpdateLines]);

    return (
        <div className={style.workspace}>
            <LinesUpdateContext.Provider value={forceUpdateLines}>
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
