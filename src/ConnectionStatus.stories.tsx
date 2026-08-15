import { ConnectionStatus, useID } from '@base/main';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Theme, Recoil } from './decorators';
import './style.css';
import { useEffect, useRef } from 'react';
import { PeerEvent } from '@base/services/peer2peer/types';
import { Peer, usePeerData, usePeerEvent, usePeerSender } from '@base/hooks/peer';

export default {
    decorators: [Theme, Recoil],
} satisfies Meta;

export const Start: StoryFn = () => {
    const id = useID(5);
    return (
        <Peer
            host={import.meta.env.VITE_APP_PEER_SERVER}
            secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
            peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
            port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
            code={`test-${id}`}
        >
            <ConnectionStatus
                api={import.meta.env.VITE_APP_APIURL}
                appName="dev"
            />
        </Peer>
    );
};

export const LoopP2P: StoryFn = () => {
    const id = useID(5);
    const counter = useRef(0);

    function Looper() {
        const send = usePeerSender();
        usePeerEvent('ping', (data: PeerEvent) => {
            console.log('Data', data, counter.current++);
        });

        useEffect(() => {
            if (send) {
                const int = setInterval(() => {
                    send({ event: 'ping' });
                }, 1000);
                return () => {
                    clearInterval(int);
                };
            }
        }, [send]);

        return null;
    }

    return (
        <>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-server`}
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-${id}`}
                server={'test-server'}
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
        </>
    );
};

export const LoopRelay: StoryFn = () => {
    const id = useID(5);
    const counter = useRef(0);

    function Looper() {
        const send = usePeerSender();
        usePeerData((data: PeerEvent) => {
            console.log('Data', data, counter.current++);
        });

        useEffect(() => {
            if (send) {
                const int = setInterval(() => {
                    send({ event: 'ping' });
                }, 1000);
                return () => {
                    clearInterval(int);
                };
            }
        }, [send]);

        return null;
    }

    return (
        <>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-server`}
                forceTURN
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-${id}`}
                server={'test-server'}
                forceTURN
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
        </>
    );
};

export const LoopSocket: StoryFn = () => {
    const id = useID(5);
    const counter = useRef(0);

    function Looper() {
        const send = usePeerSender();
        usePeerData((data: PeerEvent) => {
            console.log('Data', data, counter.current++);
        });

        useEffect(() => {
            if (send) {
                const int = setInterval(() => {
                    send({ event: 'ping' });
                }, 1000);
                return () => {
                    clearInterval(int);
                };
            }
        }, [send]);

        return null;
    }

    return (
        <>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-server`}
                forceWebsocket
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`test-${id}`}
                server={'test-server'}
                forceWebsocket
            >
                <Looper />
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName="dev"
                    noCheck
                />
            </Peer>
        </>
    );
};

interface DisabledProps {
    disabled: boolean;
}

export const Disabled: StoryFn<DisabledProps> = ({ disabled }: DisabledProps) => {
    const id = useID(5);

    return (
        <Peer
            host={import.meta.env.VITE_APP_PEER_SERVER}
            secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
            peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
            port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
            code={`test-${id}`}
            disabled={disabled}
        >
            <ConnectionStatus
                api={import.meta.env.VITE_APP_APIURL}
                appName="dev"
            />
        </Peer>
    );
};

Disabled.args = {
    disabled: true,
};
