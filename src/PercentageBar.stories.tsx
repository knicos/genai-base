import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import { PercentageBar } from '@base/main';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const BasicPercentageBar: Story = () => (
    <PercentageBar
        colour="blue"
        value={75}
    />
);

export const VerticalPercentageBar: Story = () => (
    <PercentageBar
        colour="blue"
        value={75}
        orientation="vertical"
        hideLabel
        thickness={20}
    />
);

export const NoLabelPercentageBar: Story = () => (
    <PercentageBar
        colour="purple"
        value={75}
        hideLabel
    />
);

export const VerticalLabelPercentageBar: Story = () => (
    <PercentageBar
        colour="green"
        value={75}
        orientation="vertical"
    />
);
