import { KeyboardEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const MIN_SIZE = 30;
const MIN_EXPANDED_SIZE = 300;
const DEFAULT_SIZE = Math.max(MIN_EXPANDED_SIZE, Math.floor(window.innerWidth * 0.25));

const WIDTH_STORAGE_KEY = 'sidePanelWidth';

interface Props extends PropsWithChildren {
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    position?: 'right' | 'bottom';
}

export default function SidePanel({ children, open, onClose, onOpen, position = 'right' }: Props) {
    const [size, setSize] = useState(open ? DEFAULT_SIZE : 0);
    const barRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isClosed, setIsClosed] = useState(!open);
    const lastSizeRef = useRef<number>(
        window.sessionStorage.getItem(WIDTH_STORAGE_KEY)
            ? Number(window.sessionStorage.getItem(WIDTH_STORAGE_KEY))
            : DEFAULT_SIZE
    );

    const MAX_SIZE = Math.max(
        MIN_EXPANDED_SIZE,
        Math.floor(position === 'right' ? window.innerWidth / 2 : window.innerHeight / 2)
    );

    useEffect(() => {
        if (!open) {
            setSize(0);
            const timer = setTimeout(() => {
                setIsClosed(true);
            }, 300); // Match the CSS transition duration

            return () => clearTimeout(timer);
        } else {
            setIsOpening(true);
            setIsClosed(false);
        }
    }, [open]);

    // Remove width animation after opening
    // Needed to prevent width animation on resize
    useEffect(() => {
        if (isOpening) {
            setSize(lastSizeRef.current || DEFAULT_SIZE);
            const timer = setTimeout(() => {
                setIsOpening(false);
            }, 300); // Match the CSS transition duration

            return () => clearTimeout(timer);
        }
    }, [isOpening]);

    useEffect(() => {
        if (isResizing) {
            function handleMouseMove(e: PointerEvent) {
                if (isResizing && barRef.current) {
                    const panelRect = barRef.current.getBoundingClientRect();
                    const newSize = position === 'right' ? panelRect.right - e.clientX : panelRect.bottom - e.clientY;
                    const clampedSize = Math.max(Math.min(newSize, MAX_SIZE), MIN_SIZE);

                    if (clampedSize - newSize > 10) {
                        setSize(0);
                    } else {
                        lastSizeRef.current = clampedSize;
                        setSize(clampedSize);
                        window.sessionStorage.setItem(WIDTH_STORAGE_KEY, clampedSize.toString());
                    }
                    e.preventDefault();
                }
            }

            function handleMouseUp() {
                setIsResizing(false);
            }

            window.addEventListener('pointermove', handleMouseMove, { passive: false });
            window.addEventListener('pointerup', handleMouseUp);

            document.body.classList.add(style.noSelect);

            return () => {
                window.removeEventListener('pointermove', handleMouseMove);
                window.removeEventListener('pointerup', handleMouseUp);
                document.body.classList.remove(style.noSelect);
            };
        }
    }, [isResizing, position, MAX_SIZE]);

    const isMinimised = size === 0;

    const resizer = (
        <div
            className={`${style.resizer} ${isResizing ? style.resizing : ''} ${
                position === 'right' ? style.resizerVertical : style.resizerHorizontal
            }`}
            onPointerDown={() => {
                setIsResizing(true);
                if (onOpen) {
                    onOpen();
                }
            }}
        >
            <div className={style.resizerBar} />
            {open && (
                <div
                    className={`${style.resizerHandle} ${isMinimised ? style.minimised : ''}`}
                    role="separator"
                    aria-orientation={position === 'right' ? 'vertical' : 'horizontal'}
                    aria-label="Resize sidebar"
                    tabIndex={0}
                    aria-valuenow={size}
                    aria-valuemin={MIN_SIZE}
                    aria-valuemax={MAX_SIZE}
                    onKeyDown={(e: KeyboardEvent) => {
                        if (position === 'right') {
                            if (e.key === 'ArrowRight') {
                                setSize((w) => Math.min(MAX_SIZE, Math.max(0, w - 50)));
                            } else if (e.key === 'ArrowLeft') {
                                setSize((w) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, w + 50)));
                            }
                        } else {
                            if (e.key === 'ArrowDown') {
                                setSize((h) => Math.min(MAX_SIZE, Math.max(0, h - 50)));
                            } else if (e.key === 'ArrowUp') {
                                setSize((h) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, h + 50)));
                            }
                        }
                    }}
                />
            )}
        </div>
    );

    return (
        <section
            className={`${style.sidePanel} ${open ? style.open : style.closed} ${isOpening ? style.opening : ''} ${
                position === 'right' ? style.sidePanelVertical : style.sidePanelHorizontal
            }`}
            style={
                position === 'right'
                    ? { width: isMinimised ? 0 : size, visibility: isClosed ? 'hidden' : undefined }
                    : { height: isMinimised ? 0 : size, visibility: isClosed ? 'hidden' : undefined }
            }
            ref={barRef}
            aria-hidden={!open}
        >
            {(position === 'right' || position === 'bottom') && resizer}
            <div className={style.content}>
                {onClose && (
                    <div className={style.closeButton}>
                        <IconButton
                            onClick={onClose}
                            data-testid="sidepanel-close-button"
                        >
                            <CloseIcon
                                fontSize="medium"
                                htmlColor="#444"
                            />
                        </IconButton>
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
