import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import ProgressRing from '@base/components/ProgressRing/ProgressRing';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const ProgressRingStory: Story = () => (
    <section>
        <ProgressRing segments={6} completed={4}/>
    </section>
);
