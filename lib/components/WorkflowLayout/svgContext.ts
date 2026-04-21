import { createContext, useContext } from 'react';

export interface WorkflowContext {
    registerElement: (id: string, element: HTMLElement) => () => void;
    updateLines: () => void;
    elements: Map<string, Set<HTMLElement>>;
}

export const LinesUpdateContext = createContext<WorkflowContext | undefined>(undefined);

export function useWorkflowContext() {
    const ctx = useContext(LinesUpdateContext);
    if (!ctx) throw new Error('useWorkflowContext must be used within WorkflowLayout');
    return ctx;
}
