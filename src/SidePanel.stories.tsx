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
        <div style={{ flexGrow: 1, backgroundColor: '#dee4e8' }}>Other Content</div>
        <SidePanel open={true}>Content inside the side panel</SidePanel>
    </section>
);

export const TopSidePanel: Story = () => (
    <section
        style={{
            height: '100%',
            minHeight: '400px',
            position: 'relative',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column',
        }}
    >
        <div style={{ flexGrow: 1, backgroundColor: '#dee4e8' }}>Other Content</div>
        <SidePanel
            open={true}
            position="bottom"
        >
            Content inside the side panel
        </SidePanel>
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
            <div style={{ flexGrow: 1, backgroundColor: '#dee4e8' }}>
                <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Side Panel</Button>
            </div>
            <SidePanel
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                Content inside the side panel
            </SidePanel>
        </section>
    );
};

export const DarkSidePanel: Story = () => {
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
            <div style={{ flexGrow: 1, backgroundColor: '#dee4e8', overflow: 'auto', minWidth: 0 }}>
                <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Side Panel</Button>
                <div style={{ height: '20px', width: 2000 }} />
            </div>
            <SidePanel
                open={isOpen}
                onClose={() => setIsOpen(false)}
                dark={true}
            >
                <div style={{ padding: '20px' }}>
                    <h2>Dark Side Panel</h2>
                    <p>This side panel uses the dark theme.</p>
                    <p>It should have a dark background and light text.</p>
                </div>
            </SidePanel>
        </section>
    );
};
