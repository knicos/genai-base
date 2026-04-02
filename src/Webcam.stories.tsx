import { Webcam } from '@base/main';
import { Story, StoryDefault } from '@ladle/react';
import { Theme } from './decorators';
import './style.css';

export default {
    decorators: [Theme],
} satisfies StoryDefault;

export const WebcamStory: Story = () => <Webcam size={128} />;

const movement = {
    x: 0,
    y: 0,
    dirX: 1,
    dirY: 1,
};

function postProcess(input: HTMLCanvasElement, output: HTMLCanvasElement) {
    const ctx = output.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.drawImage(input, 0, 0);
    ctx.fillStyle = 'red';
    ctx.fillRect(movement.x, movement.y, 10, 10);

    movement.x = movement.x + movement.dirX;
    movement.y = movement.y + movement.dirY;
    if (movement.x > output.width - 10) {
        movement.dirX = -1;
    }
    if (movement.x < 0) {
        movement.dirX = 1;
    }
    if (movement.y > output.height - 10) {
        movement.dirY = -1;
    }
    if (movement.y < 0) {
        movement.dirY = 1;
    }
}

export const WebcamPostStory: Story = () => (
    <Webcam
        size={128}
        onPostprocess={postProcess}
    />
);
