import { Privacy } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const PrivacyButton: StoryFn = () => (
    <Privacy
        appName="test"
        tag="v1"
        position="bottomLeft"
        style={{ marginBottom: '4rem' }}
    />
);
