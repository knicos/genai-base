import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import usePeer from './peer';
import { TestWrapper } from '@base/main';
import { iceConfig, webrtcActive } from '@base/state/webrtcState';

const { MockPeer2Peer } = vi.hoisted(() => {
    return {
        MockPeer2Peer: vi.fn(),
    };
});

vi.mock('@base/services/peer2peer/Peer2Peer', () => {
    const Peer2Peer = MockPeer2Peer;
    Peer2Peer.prototype.on = vi.fn();
    Peer2Peer.prototype.destroy = vi.fn();
    return { default: Peer2Peer };
});

describe('usePeer', () => {
    it('initiates a peer connection', ({ expect }) => {
        function Component() {
            usePeer({ code: '1234', server: '1235', host: 'localhost' });
            return null;
        }

        render(
            <TestWrapper
                initializeState={({ set }) => {
                    set(iceConfig, {
                        expiresOn: new Date(),
                        iceServers: [],
                    });
                    set(webrtcActive, 'full');
                }}
            >
                <Component />
            </TestWrapper>
        );

        expect(MockPeer2Peer).toHaveBeenCalledWith(
            '1234',
            'localhost',
            false,
            'peerjs',
            443,
            { expiresOn: expect.any(Date), iceServers: [] },
            false,
            '1235',
            {
                forceTURN: undefined,
                forceWebsocket: undefined,
            }
        );

        expect(MockPeer2Peer.prototype.on).toHaveBeenCalledWith('status', expect.any(Function));
        expect(MockPeer2Peer.prototype.on).toHaveBeenCalledWith('data', expect.any(Function));
    });
});
