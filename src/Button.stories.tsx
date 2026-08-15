import { BusyButton, Button, LargeButton, VerticalButton } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const ButtonOutline: StoryFn = () => <Button variant="outlined">Hello</Button>;
export const ButtonContained: StoryFn = () => <Button variant="contained">Hello</Button>;
export const ButtonSecondary: StoryFn = () => (
    <Button
        variant="contained"
        color="secondary"
    >
        Hello
    </Button>
);

export const Vertical: StoryFn = () => (
    <VerticalButton
        variant="contained"
        color="secondary"
    >
        Hello
    </VerticalButton>
);

export const Large: StoryFn = () => (
    <LargeButton
        variant="contained"
        color="secondary"
    >
        Hello
    </LargeButton>
);

export const Busy: StoryFn = () => (
    <BusyButton
        variant="contained"
        color="secondary"
        busy
    >
        Working...
    </BusyButton>
);
