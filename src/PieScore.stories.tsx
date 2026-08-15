import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import { PieScore } from '@base/main';

export default {
    decorators: [Theme],
} satisfies Meta;

export const BasicPie: StoryFn = () => <PieScore value={0.5} />;
