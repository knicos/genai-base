import { HomeBanner } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const Small: StoryFn = () => (
    <HomeBanner
        title="Small Banner"
        subtitle="This is a small banner"
        githubUrl="https://github.com/knicos"
        githubLabel="GitHub"
        teachingMaterialsUrl="https://example.com"
        teachingMaterialsLabel="Teaching Materials"
    />
);
