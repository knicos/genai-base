import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import { Feedback } from '@base/main';

export default {
    decorators: [Theme],
} satisfies Meta;

export const FeedbackStory: StoryFn = () => (
    <section>
        <Feedback
            delay={0}
            application="tm"
            apiUrl={import.meta.env.VITE_FEEDBACK_URL || ''}
        />
    </section>
);
