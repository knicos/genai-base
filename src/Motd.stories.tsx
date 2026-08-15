import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';
import Motd from '@base/components/Motd/Motd';

export default {
    decorators: [Theme],
} satisfies Meta;

export const MOTDInfo: StoryFn = () => <Motd message="Some empty message" />;

export const MOTDWarn: StoryFn = () => <Motd message="warn:Some empty message" />;

export const MOTDError: StoryFn = () => <Motd message="error:Some empty message" />;

export const MOTDFetch: StoryFn = () => <Motd />;
