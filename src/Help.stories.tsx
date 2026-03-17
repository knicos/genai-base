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

export const HelpBoxStory: Story = () => (
    <section>
        <Help message="Some help about hello">Hello world</Help>
    </section>
);
