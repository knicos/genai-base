import { Spinner } from '@base/main';
import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const Small: Story = () => <Spinner size="small" />;
export const Normal: Story = () => <Spinner size="normal" />;
export const Large: Story = () => <Spinner size="large" />;
export const Dark: Story = () => (
    <div style={{ background: '#333', padding: '20px' }}>
        <Spinner
            color="dark"
            size="small"
        />
    </div>
);
export const Pink: Story = () => (
    <div style={{ background: '#e996e9', padding: '20px' }}>
        <Spinner
            color="secondary"
            size="normal"
        />
    </div>
);
export const Disabled: Story = () => (
    <Spinner
        size="normal"
        disabled
    />
);
