import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import ProgressRing from '@base/components/ProgressRing/ProgressRing';

export default {
    decorators: [Theme],
} satisfies Meta;

export const ProgressRingStory: StoryFn = () => (
    <section>
        <ProgressRing
            segments={6}
            completed={4}
        />
    </section>
);
