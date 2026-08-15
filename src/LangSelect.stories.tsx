import { LangSelect } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const LanguageSelectLight: StoryFn = () => <LangSelect />;

export const LanguageSelectDark: StoryFn = () => (
    <section style={{ backgroundColor: '#333', padding: '1rem' }}>
        <LangSelect dark />
    </section>
);
