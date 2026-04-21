import { createContext, useContext } from 'react';
import EE from 'eventemitter3';

export type WorkflowEvents = 'linesUpdated' | 'elementRegistered' | 'elementUnregistered';

export interface WorkflowContext {
    registerElement: (id: string, element: HTMLElement) => () => void;
    updateLines: () => void;
    elements: Map<string, Set<HTMLElement>>;
    events: EE<WorkflowEvents>;
}

export const LinesUpdateContext = createContext<WorkflowContext | undefined>(undefined);

export function useWorkflowContext() {
    const ctx = useContext(LinesUpdateContext);
    if (!ctx) throw new Error('useWorkflowContext must be used within WorkflowLayout');
    return ctx;
}
