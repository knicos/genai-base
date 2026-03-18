import { Popper, PopperProps } from '@mui/material';
import style from './style.module.css';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

interface Props extends Omit<PopperProps, 'children'>, PropsWithChildren {
    theme?: 'light' | 'dark';
    offsetY?: number;
    offsetX?: number;
    delay?: number;
}

export default function InfoPop({
    open,
    delay,
    children,
    offsetY = 0,
    offsetX = 0,
    modifiers: userModifiers,
    theme = 'dark',
    ...props
}: Props) {
    const [realOpen, setRealOpen] = useState(open);
    const stillOpen = useRef(open);
    const [arrowEl, setArrowEl] = useState<HTMLSpanElement | null>(null);

    stillOpen.current = open;

    useEffect(() => {
        if (open) {
            const timeout = delay
                ? setTimeout(() => {
                      if (stillOpen.current) setRealOpen(open);
                  }, delay)
                : undefined;
            return () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
            };
        } else {
            setRealOpen(false);
        }
    }, [open, delay]);

    const modifiers = useMemo(() => {
        const next = [...(userModifiers ?? [])];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const upsert = (name: string, modifier: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const idx = next.findIndex((m: any) => m?.name === name);
            if (idx >= 0) next[idx] = modifier;
            else next.push(modifier);
        };

        if (offsetX || offsetY) {
            upsert('offset', {
                name: 'offset',
                options: { offset: [offsetX, offsetY] },
            });
        }

        if (arrowEl) {
            upsert('arrow', {
                name: 'arrow',
                options: { element: arrowEl, padding: 8 },
            });
        }

        return next;
    }, [userModifiers, offsetX, offsetY, arrowEl]);

    return (
        <Popper
            open={delay ? realOpen : open}
            {...props}
            className={style.root}
            modifiers={modifiers}
            sx={{ zIndex: 10 }}
        >
            <div className={`${style.popper} ${style[theme]}`}>
                <span
                    ref={setArrowEl}
                    className={style.arrow}
                    data-popper-arrow
                />
                {children}
            </div>
        </Popper>
    );
}
