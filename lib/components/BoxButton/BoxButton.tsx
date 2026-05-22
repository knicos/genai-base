import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import styleModule from './style.module.css';
import { VerticalButton } from '../Button/Button';
import { useWorkflowContext } from '../WorkflowLayout';

interface Props {
    label: string;
    icon: ReactNode;
    widget: string;
    onClick: () => void;
    style?: CSSProperties;
}

export default function BoxButton({ label, icon, widget, onClick, style }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const workflowContext = useWorkflowContext();

    useEffect(() => {
        if (ref.current) {
            return workflowContext.registerElement(widget, ref.current);
        }
    }, [widget, workflowContext]);

    return (
        <div
            className={styleModule.boxButton}
            data-widget={widget}
            onClick={onClick}
            ref={ref}
            style={style}
        >
            <VerticalButton
                color="inherit"
                startIcon={icon}
            >
                {label}
            </VerticalButton>
        </div>
    );
}
