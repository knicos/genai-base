import { Fragment, type ReactNode, useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import InfoPop from '../InfoPop/InfoPop';
import style from './style.module.css';

export type StageBarItemStatus = 'complete' | 'available' | 'blocked' | 'warning' | 'upcoming';
export type StageBarPopoverTheme = 'light' | 'dark';

const ITEM_WIDTH = 200;

export interface StageBarItem {
    id: string;
    label: string;
    href?: string;
    status?: StageBarItemStatus;
    disabled?: boolean;
    popover?: ReactNode;
}

export interface StageBarHomeButton {
    ariaLabel?: string;
    disabled?: boolean;
    href?: string;
    onClick?: () => void;
    selected?: boolean;
}

export interface StageBarProps {
    items: StageBarItem[];
    activeId: string;
    onChange?: (id: string, item: StageBarItem) => void;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
    homeButton?: StageBarHomeButton;
    popoverDelay?: number;
    popoverOffsetY?: number;
    popoverTheme?: StageBarPopoverTheme;
}

function getIcon(status: StageBarItemStatus) {
    if (status === 'complete') return TaskAltIcon;
    if (status === 'warning') return ErrorOutlineIcon;
    return RadioButtonUncheckedIcon;
}

export default function StageBar({
    items,
    activeId,
    onChange,
    ariaLabel,
    className,
    disabled,
    homeButton,
    popoverDelay = 500,
    popoverOffsetY = 20,
    popoverTheme,
}: StageBarProps) {
    const [width, setWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(ITEM_WIDTH);
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const [offset, setOffset] = useState(0);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [hoveredItem, setHoveredItem] = useState<StageBarItem | null>(null);

    useEffect(() => {
        const updateMeasurements = () => {
            if (containerRef.current) {
                const w = containerRef.current.getBoundingClientRect().width;
                setWidth(w);
            }
            if (listRef.current && items.length > 0) {
                const w = listRef.current.scrollWidth;
                setItemWidth(w / items.length);
            }
        };
        updateMeasurements();

        const observer = new ResizeObserver(updateMeasurements);
        if (containerRef.current) observer.observe(containerRef.current);
        if (listRef.current) observer.observe(listRef.current);

        return () => observer.disconnect();
    }, [items.length]);

    const numVisible = Math.floor((width + 20) / (itemWidth + 20));
    const maxOffset = Math.max(0, items.length - numVisible);
    const hasLeftArrow = numVisible > 1 && offset > 0;
    const hasRightArrow = numVisible > 1 && offset + numVisible < items.length;

    const handleOffsetChange = (newOffset: number) => {
        setOffset((o) => Math.max(0, Math.min(maxOffset, o + newOffset)));
    };

    useEffect(() => {
        setOffset((o) => Math.min(o, maxOffset));
    }, [maxOffset]);

    useEffect(() => {
        if (listRef.current) {
            const itemElements = listRef.current.querySelectorAll<HTMLElement>('[data-stage-bar-item]');
            const child = itemElements[offset];
            if (child) {
                child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            }
        }
    }, [offset]);

    const showPopover = (anchor: HTMLElement, item: StageBarItem) => {
        if (item.popover == null) return;

        setAnchorEl(anchor);
        setHoveredItem(item);
    };

    const hidePopover = () => {
        setAnchorEl(null);
        setHoveredItem(null);
    };

    const popover = hoveredItem?.popover;
    const homeButtonDisabled = disabled || homeButton?.disabled;
    const homeButtonClassName = `${style.homeButton} ${homeButton?.selected ? style.selected : ''}`;
    const homeButtonLabel = homeButton?.ariaLabel || 'Home';
    const homeButtonContent = <HomeIcon fontSize="inherit" />;

    return (
        <nav
            className={`${style.container} ${className || ''}`}
            ref={containerRef}
            aria-label={ariaLabel}
        >
            {homeButton &&
                (homeButton.href ? (
                    <a
                        className={homeButtonClassName}
                        href={homeButton.href}
                        aria-label={homeButtonLabel}
                        aria-disabled={homeButtonDisabled || undefined}
                        aria-current={homeButton.selected ? 'page' : undefined}
                        tabIndex={homeButtonDisabled ? -1 : undefined}
                        onClick={(event) => {
                            if (homeButtonDisabled) {
                                event.preventDefault();
                                return;
                            }

                            homeButton.onClick?.();
                        }}
                    >
                        {homeButtonContent}
                    </a>
                ) : (
                    <button
                        type="button"
                        className={homeButtonClassName}
                        aria-label={homeButtonLabel}
                        aria-pressed={homeButton.selected}
                        disabled={homeButtonDisabled}
                        onClick={homeButton.onClick}
                    >
                        {homeButtonContent}
                    </button>
                ))}
            <div
                className={style.itemList}
                ref={listRef}
            >
                {items.map((item, index) => {
                    const selected = item.id === activeId;
                    const itemDisabled = disabled || item.disabled;
                    const status = item.status || 'available';
                    const Icon = getIcon(status);
                    const itemClassName = `${style.item} ${style[status]} ${selected ? style.selected : ''}`;
                    const itemContent = (
                        <>
                            <Icon className={style.icon} />
                            <span className={style.itemText}>{item.label}</span>
                        </>
                    );

                    return (
                        <Fragment key={item.id}>
                            {item.href ? (
                                <a
                                    data-stage-bar-item
                                    className={itemClassName}
                                    href={item.href}
                                    aria-current={selected ? 'page' : undefined}
                                    aria-disabled={itemDisabled || undefined}
                                    tabIndex={itemDisabled ? -1 : undefined}
                                    onMouseEnter={(event) => showPopover(event.currentTarget, item)}
                                    onMouseLeave={hidePopover}
                                    onClick={(event) => {
                                        if (itemDisabled) {
                                            event.preventDefault();
                                            return;
                                        }

                                        hidePopover();
                                        onChange?.(item.id, item);
                                    }}
                                    onContextMenu={(event) => {
                                        showPopover(event.currentTarget, item);
                                        event.preventDefault();
                                    }}
                                >
                                    {itemContent}
                                </a>
                            ) : (
                                <button
                                    data-stage-bar-item
                                    type="button"
                                    className={itemClassName}
                                    disabled={itemDisabled}
                                    aria-pressed={selected}
                                    onMouseEnter={(event) => showPopover(event.currentTarget, item)}
                                    onMouseLeave={hidePopover}
                                    onClick={() => {
                                        hidePopover();
                                        onChange?.(item.id, item);
                                    }}
                                    onContextMenu={(event) => {
                                        showPopover(event.currentTarget, item);
                                        event.preventDefault();
                                    }}
                                >
                                    {itemContent}
                                </button>
                            )}
                            {index < items.length - 1 && <div className={style.bgBar} />}
                        </Fragment>
                    );
                })}
            </div>
            {hasLeftArrow && (
                <button
                    type="button"
                    className={`${style.arrow} ${style.left}`}
                    onClick={() => handleOffsetChange(-1)}
                    disabled={disabled}
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <ArrowBackIosNewIcon fontSize="inherit" />
                </button>
            )}
            {hasRightArrow && (
                <button
                    type="button"
                    className={`${style.arrow} ${style.right}`}
                    onClick={() => handleOffsetChange(1)}
                    disabled={disabled}
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <ArrowForwardIosIcon fontSize="inherit" />
                </button>
            )}
            <InfoPop
                open={!!anchorEl && popover != null}
                anchorEl={anchorEl}
                offsetY={popoverOffsetY}
                delay={popoverDelay}
                theme={popoverTheme}
            >
                {popover}
            </InfoPop>
        </nav>
    );
}
