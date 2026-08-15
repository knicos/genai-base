import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import { InfoPop } from '@base/main';

export default {
    decorators: [Theme],
} satisfies Meta;

export const InfoPopStory: StoryFn = () => (
    <section>
        <InfoPop open>Hello world</InfoPop>
    </section>
);
