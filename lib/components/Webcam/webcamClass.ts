/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { cropTo } from '@base/util/canvas';

const defaultVideoOptions: MediaTrackConstraints = {
    facingMode: 'user',
    frameRate: 24,
};

const fillConstraints = (options: Partial<MediaTrackConstraints>) => {
    options.facingMode = options.facingMode || defaultVideoOptions.facingMode;
    options.frameRate = options.frameRate || defaultVideoOptions.frameRate;
    options.aspectRatio = options.aspectRatio || defaultVideoOptions.aspectRatio;
    return options as MediaTrackConstraints;
};

export class WebcamClass {
    public flip: boolean;
    public width: number;
    public height: number;
    public webcam?: HTMLVideoElement;
    public canvas?: HTMLCanvasElement;

    constructor(width = 400, height = 400, flip = false) {
        this.width = width;
        this.height = height;
        this.flip = flip;
    }

    public getWebcam(options: MediaTrackConstraints = {}) {
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return Promise.reject('Your browser does not support WebRTC. Please try another one.');
        }

        options.width = 640;
        const videoOptions = fillConstraints(options);

        const video = document.createElement('video');
        return window.navigator.mediaDevices.getUserMedia({ video: videoOptions }).then(
            (mediaStream) => {
                video.srcObject = mediaStream;

                video.addEventListener('loadedmetadata', () => {
                    const { videoWidth: vw, videoHeight: vh } = video;
                    video.width = vw;
                    video.height = vh;
                });

                return video;
            },
            () => {
                return Promise.reject('Could not open your camera. You may have denied access.');
            }
        );
    }

    // setup or setupWebcam
    public async setup(options: MediaTrackConstraints = {}) {
        if (!this.webcam) {
            this.webcam = await this.getWebcam(options);

            if (!this.canvas) {
                this.canvas = document.createElement('canvas');
                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
        }
    }

    public play() {
        const promise = this.webcam?.play();
        return promise;
    }

    public pause() {
        this.webcam?.pause();
    }

    public stop() {
        if (this.webcam) {
            this.stopStreamedVideo(this.webcam);
        }
    }

    public update() {
        this.renderCameraToCanvas();
    }

    public stopStreamedVideo(videoEl: HTMLVideoElement) {
        const stream = videoEl.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        videoEl.srcObject = null;
    }

    public renderCameraToCanvas() {
        if (this.canvas && this.webcam) {
            const ctx = this.canvas.getContext('2d');

            if (ctx && this.webcam.videoWidth !== 0) {
                cropTo(this.webcam, this.width, this.flip, this.canvas);
            }
        }
    }
}
