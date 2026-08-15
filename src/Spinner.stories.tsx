import { Spinner } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const Small: StoryFn = () => <Spinner size="small" />;
export const Normal: StoryFn = () => <Spinner size="normal" />;
export const Large: StoryFn = () => <Spinner size="large" />;
export const Dark: StoryFn = () => (
    <div style={{ background: '#333', padding: '20px' }}>
        <Spinner
            color="dark"
            size="small"
        />
    </div>
);
export const Pink: StoryFn = () => (
    <div style={{ background: '#e996e9', padding: '20px' }}>
        <Spinner
            color="secondary"
            size="normal"
        />
    </div>
);
export const Disabled: StoryFn = () => (
    <Spinner
        size="normal"
        disabled
    />
);
