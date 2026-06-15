import { HomeBanner } from '@base/main';
import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const Small: Story = () => (
    <HomeBanner
        title="Small Banner"
        subtitle="This is a small banner"
        githubUrl="https://github.com/knicos"
        githubLabel="GitHub"
        teachingMaterialsUrl="https://example.com"
        teachingMaterialsLabel="Teaching Materials"
    />
);
