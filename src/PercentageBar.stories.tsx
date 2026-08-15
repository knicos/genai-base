import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import { PercentageBar } from '@base/main';

export default {
    decorators: [Theme],
} satisfies Meta;

export const BasicPercentageBar: StoryFn = () => (
    <PercentageBar
        colour="blue"
        value={75}
    />
);

export const VerticalPercentageBar: StoryFn = () => (
    <PercentageBar
        colour="blue"
        value={75}
        orientation="vertical"
        hideLabel
        thickness={20}
    />
);

export const NoLabelPercentageBar: StoryFn = () => (
    <PercentageBar
        colour="purple"
        value={75}
        hideLabel
    />
);

export const VerticalLabelPercentageBar: StoryFn = () => (
    <PercentageBar
        colour="green"
        value={75}
        orientation="vertical"
    />
);
