import { StageBar, StageBarItem } from '@base/main';
import { Story, StoryDefault } from '@ladle/react';
import { type ReactNode, useState } from 'react';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

function StoryFrame({ children }: { children: ReactNode }) {
    return (
        <nav
            style={{
                background: '#444',
                fontFamily: 'Andika, sans-serif',
                boxShadow: 'none',
                position: 'static',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    paddingRight: '1rem',
                    alignItems: 'stretch',
                    color: 'white',
                    minHeight: 59,
                    height: 80,
                }}
            >
                {children}
            </div>
        </nav>
    );
}

const LLMItems: StageBarItem[] = [
    {
        id: 'model',
        label: 'Model',
        href: '#model',
        status: 'complete',
        popover: 'Choose the language model used by the workflow.',
    },
    {
        id: 'data',
        label: 'Data',
        href: '#data',
        status: 'available',
        popover: 'Prepare the text that will be used by the language model workflow.',
    },
    {
        id: 'training',
        label: 'Training',
        href: '#training',
        status: 'upcoming',
        popover: 'Train the model with your prepared data.',
    },
    {
        id: 'fine-tuning',
        label: 'Fine-tuning',
        href: '#fine-tuning',
        status: 'upcoming',
        popover: 'Adjust the model to improve its results.',
    },
    {
        id: 'deployment',
        label: 'Deployment',
        href: '#deployment',
        status: 'upcoming',
        popover: 'Deploy the model when it is ready to use.',
    },
];

const TMItems: StageBarItem[] = [
    { id: 'concepts', label: 'Concepts', status: 'complete' },
    { id: 'connections', label: 'Connections', status: 'available' },
    { id: 'advanced', label: 'Advanced', status: 'upcoming' },
];

export const TeachableMachineTransferLearning: Story = () => {
    const [activeId, setActiveId] = useState('connections');

    return (
        <StoryFrame>
            <StageBar
                ariaLabel="Transfer learning stages"
                items={TMItems}
                activeId={activeId}
                onChange={setActiveId}
            />
        </StoryFrame>
    );
};

export const LLMWorkflowBar: Story = () => {
    const [activeId, setActiveId] = useState('data');

    return (
        <StoryFrame>
            <StageBar
                ariaLabel="Language model workflow stages"
                items={LLMItems}
                activeId={activeId}
                onChange={setActiveId}
                homeButton={{
                    ariaLabel: 'Home',
                    href: '#home',
                    onClick: () => setActiveId('home'),
                    selected: activeId === 'home',
                }}
            />
        </StoryFrame>
    );
};

export const LLMWorkflowBarConstrained: Story = () => {
    const [activeId, setActiveId] = useState('data');

    return (
        <StoryFrame>
            <div style={{ width: 600, display: 'flex', alignItems: 'stretch' }}>
                <StageBar
                    ariaLabel="Constrained language model workflow stages"
                    items={LLMItems}
                    activeId={activeId}
                    onChange={setActiveId}
                    homeButton={{
                        ariaLabel: 'Home',
                        href: '#home',
                        onClick: () => setActiveId('home'),
                        selected: activeId === 'home',
                    }}
                />
            </div>
        </StoryFrame>
    );
};

export const Disabled: Story = () => (
    <StoryFrame>
        <StageBar
            ariaLabel="Disabled workflow stages"
            items={LLMItems}
            activeId="data"
            disabled
        />
    </StoryFrame>
);

export const ItemsDisabled: Story = () => {
    const [activeId, setActiveId] = useState('data');
    const items = LLMItems.map((item) =>
        item.id === 'fine-tuning' || item.id === 'deployment' ? { ...item, disabled: true } : item
    );

    return (
        <StoryFrame>
            <StageBar
                ariaLabel="Workflow stages with disabled items"
                items={items}
                activeId={activeId}
                onChange={setActiveId}
                homeButton={{
                    ariaLabel: 'Home',
                    href: '#home',
                    onClick: () => setActiveId('home'),
                    selected: activeId === 'home',
                }}
            />
        </StoryFrame>
    );
};
