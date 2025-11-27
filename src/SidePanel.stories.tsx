import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import { Button, SidePanel } from '@base/main';
import { useState } from 'react';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const BasicSidePanel: Story = () => (
    <section
        style={{
            height: '100%',
            minHeight: '400px',
            position: 'relative',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
        }}
    >
        <div style={{ flexGrow: 1, backgroundColor: 'lightgray' }}>Other Content</div>
        <SidePanel open={true}>Content inside the side panel</SidePanel>
    </section>
);

export const OpenCloseSidePanel: Story = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section
            style={{
                height: '100%',
                minHeight: '400px',
                position: 'relative',
                width: '100%',
                display: 'flex',
                overflow: 'hidden',
            }}
        >
            <div style={{ flexGrow: 1, backgroundColor: 'lightgray' }}>
                <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Side Panel</Button>
            </div>
            <SidePanel open={isOpen}>Content inside the side panel</SidePanel>
        </section>
    );
};
