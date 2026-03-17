import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';
import { Feedback } from '@base/main';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const FeedbackStory: Story = () => (
    <section>
        <Feedback
            delay={0}
            application="tm"
            apiUrl={import.meta.env.VITE_FEEDBACK_URL || ''}
        />
    </section>
);
