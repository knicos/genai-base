import { QRCode } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const Small: StoryFn = () => (
    <QRCode
        url="https://news.bbc.co.uk"
        size="small"
    />
);

export const Normal: StoryFn = () => (
    <QRCode
        url="https://news.bbc.co.uk"
        size="normal"
    />
);

export const Large: StoryFn = () => (
    <QRCode
        url="https://news.bbc.co.uk"
        size="large"
    />
);

export const Dialog: StoryFn = () => (
    <QRCode
        url="https://news.bbc.co.uk"
        dialog
    />
);
