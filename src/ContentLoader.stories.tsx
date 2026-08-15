import { ContentLoader, ZipData } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies Meta;

export const TestContentLoad: StoryFn = () => (
    <ContentLoader
        content={['https://store.gen-ai.fi/somekone/imageSet1b.zip']}
        onLoad={async (d: ZipData) => {
            console.log('ZIP', d);
        }}
    />
);
