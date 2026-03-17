import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import { InfoPop } from '@base/main';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const InfoPopStory: Story = () => (
    <section>
        <InfoPop open>Hello world</InfoPop>
    </section>
);
