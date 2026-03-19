import { LangSelect } from '@base/main';
import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const LanguageSelectLight: Story = () => <LangSelect />;

export const LanguageSelectDark: Story = () => (
    <section style={{ backgroundColor: '#333', padding: '1rem' }}>
        <LangSelect dark />
    </section>
);
