import randomId from '../util/randomId';
import { useRef } from 'react';

export default function useRandom(size: number): string {
    const ref = useRef<string | undefined>(undefined);

    if (ref.current === undefined) {
        ref.current = randomId(size);
    }

    return ref.current;
}
