import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import { Help } from '@base/main';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const HelpInplaceStory: Story = () => (
    <section>
        <Help
            inplace
            message="Some help about hello"
        >
            Hello world
        </Help>
    </section>
);

export const HelpKeepOpenStory: Story = () => (
    <section>
        <Help
            inplace
            keepOpen
            message="Some long multi-line help about hello that forces the infopop to be larger than the button and test the positioning logic"
        >
            Hello
        </Help>
    </section>
);

export const HelpKeepOpenRightStory: Story = () => (
    <section>
        <Help
            inplace
            keepOpen
            placement="right"
            message="Some long multi-line help about hello that forces the infopop to be larger than the button and test the positioning logic"
        >
            Hello
        </Help>
    </section>
);

export const HelpKeepOpenLeftStory: Story = () => (
    <section style={{ marginLeft: 300 }}>
        <Help
            inplace
            keepOpen
            placement="left"
            message="Some long multi-line help about hello that forces the infopop to be larger than the button and test the positioning logic"
        >
            Hello
        </Help>
    </section>
);

export const HelpKeepOpenTopStory: Story = () => (
    <section style={{ marginTop: 300 }}>
        <Help
            inplace
            keepOpen
            placement="top"
            message="Some long multi-line help about hello that forces the infopop to be larger than the button and test the positioning logic"
        >
            Hello
        </Help>
    </section>
);

export const HelpBoxStory: Story = () => (
    <section>
        <Help message="Some help about hello">Hello world</Help>
    </section>
);

export const HelpBoxKeepOpenStory: Story = () => (
    <section>
        <Help
            keepOpen
            message="Some help about hello"
        >
            Hello world
        </Help>
    </section>
);

export const HelpDark: Story = () => (
    <section style={{ background: '#444', padding: '2rem', color: 'white' }}>
        <Help
            keepOpen
            dark
            inplace
            message="Some help about hello"
        >
            Hello world
        </Help>
    </section>
);

export const HelpBoxBottomStory: Story = () => (
    <section>
        <Help
            keepOpen
            message="Some help about hello"
            buttonPlacement="bottom"
        >
            Hello world
        </Help>
    </section>
);
