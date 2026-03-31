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
    closeLabel?: string;
    dark?: boolean;
}

export default function SidePanel({
    children,
    open,
    onClose,
    onOpen,
    closeLabel,
    position = 'right',
    dark = false,
}: Props) {
    const [size, setSize] = useState(open ? DEFAULT_SIZE : 0);
    const barRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isClosed, setIsClosed] = useState(!open);
    const resizeRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const lastSizeRef = useRef<number>(
        window.sessionStorage.getItem(WIDTH_STORAGE_KEY)
            ? Number(window.sessionStorage.getItem(WIDTH_STORAGE_KEY))
            : DEFAULT_SIZE
    );

    const MAX_SIZE = Math.max(
        MIN_EXPANDED_SIZE,
        Math.floor(position === 'right' ? window.innerWidth * 0.9 : window.innerHeight * 0.9)
    );

    useEffect(() => {
        if (!open) {
            setSize(0);
            const timer = setTimeout(() => {
                setIsClosed(true);
                if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
                    previousFocusRef.current.focus();
                }
            }, 300); // Match the CSS transition duration

            return () => clearTimeout(timer);
        } else {
            setIsOpening(true);
            setIsClosed(false);
            previousFocusRef.current = document.activeElement ? (document.activeElement as HTMLElement) : null;
        }
    }, [open]);

    // Remove width animation after opening
    // Needed to prevent width animation on resize
    useEffect(() => {
        if (isOpening) {
            if (resizeRef.current) {
                resizeRef.current.focus();
            }

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

    const isMinimised = size === 0 || isClosed;

    const resizer = (
        <div
            className={`${style.resizer} ${isResizing ? style.resizing : ''} ${
                position === 'right' ? style.resizerVertical : style.resizerHorizontal
            } ${dark ? style.resizerDark : ''}`}
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
                    aria-valuemin={0}
                    aria-valuemax={MAX_SIZE}
                    ref={resizeRef}
                    onKeyDown={(e: KeyboardEvent) => {
                        if (position === 'right') {
                            if (e.key === 'ArrowRight') {
                                setSize((w) => {
                                    const newSize = Math.min(MAX_SIZE, Math.max(0, w - 50));
                                    lastSizeRef.current = newSize;
                                    window.sessionStorage.setItem(WIDTH_STORAGE_KEY, newSize.toString());
                                    return newSize;
                                });
                            } else if (e.key === 'ArrowLeft') {
                                setSize((w) => {
                                    const newSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, w + 50));
                                    lastSizeRef.current = newSize;
                                    window.sessionStorage.setItem(WIDTH_STORAGE_KEY, newSize.toString());
                                    return newSize;
                                });
                            }
                        } else {
                            if (e.key === 'ArrowDown') {
                                setSize((h) => {
                                    const newSize = Math.min(MAX_SIZE, Math.max(0, h - 50));
                                    lastSizeRef.current = newSize;
                                    window.sessionStorage.setItem(WIDTH_STORAGE_KEY, newSize.toString());
                                    return newSize;
                                });
                            } else if (e.key === 'ArrowUp') {
                                setSize((h) => {
                                    const newSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, h + 50));
                                    lastSizeRef.current = newSize;
                                    window.sessionStorage.setItem(WIDTH_STORAGE_KEY, newSize.toString());
                                    return newSize;
                                });
                            }
                        }
                    }}
                />
            )}
        </div>
    );

    return (
        <aside
            className={`${style.sidePanel} ${open ? style.open : style.closed} ${isOpening ? style.opening : ''} ${
                position === 'right' ? style.sidePanelVertical : style.sidePanelHorizontal
            } ${dark ? style.dark : ''}`}
            style={
                position === 'right'
                    ? {
                          width: isMinimised ? 0 : size,
                          display: isClosed ? 'none' : undefined,
                          flexBasis: isMinimised ? 0 : 'unset',
                      }
                    : {
                          height: isMinimised ? 0 : size,
                          display: isClosed ? 'none' : undefined,
                          flexBasis: isMinimised ? 0 : 'unset',
                      }
            }
            ref={barRef}
            aria-hidden={!open}
            onKeyDownCapture={(e) => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    onClose?.();
                }
            }}
        >
            {(position === 'right' || position === 'bottom') && resizer}
            <div className={style.content}>{isMinimised ? null : children}</div>
            {onClose && size > 50 && (
                <div className={style.closeButton}>
                    <IconButton
                        onClick={onClose}
                        data-testid="sidepanel-close-button"
                        aria-label={closeLabel ?? 'Close side panel'}
                        color="inherit"
                    >
                        <CloseIcon
                            fontSize="medium"
                            color="inherit"
                        />
                    </IconButton>
                </div>
            )}
        </aside>
    );
}
