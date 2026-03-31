import { IconButton } from '@mui/material';
import InfoPop from '../InfoPop/InfoPop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { CSSProperties, MouseEvent, PropsWithChildren, ReactNode, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from './style.module.css';
import { Button } from '@base/main';

interface Props extends PropsWithChildren {
    message: ReactNode;
    widget?: string;
    active?: boolean;
    style?: CSSProperties;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    buttonPlacement?: 'top' | 'bottom' | 'left' | 'right';
    inplace?: boolean;
    inside?: boolean;
    keepOpen?: boolean;
    closeLabel?: string;
    dark?: boolean;
}

export default function Help({
    message,
    children,
    widget,
    style: customStyle,
    active,
    placement,
    inplace,
    inside,
    keepOpen,
    closeLabel,
    dark,
    buttonPlacement = 'left',
}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) =>
            prev ? null : inplace || inside ? event.currentTarget : event.currentTarget.parentElement
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className={`${inplace ? style.inplaceContainer : style.container} ${anchorEl && !inplace && !inside ? style.active : ''}`}
            data-widget={widget}
            data-active={active ? 'true' : 'false'}
            style={customStyle}
        >
            {!inplace && (
                <IconButton
                    onClick={handleClick}
                    onMouseLeave={!keepOpen ? handleClose : undefined}
                    className={`${style.helpButton} ${inside ? style.helpButtonInside : ''} ${style[buttonPlacement]} ${dark ? style.dark : ''}`}
                    color="inherit"
                >
                    <HelpOutlineIcon fontSize="medium" />
                </IconButton>
            )}
            {children}
            {inplace && (
                <IconButton
                    onClick={handleClick}
                    onMouseLeave={!keepOpen ? handleClose : undefined}
                    className={`${style.helpButtonInplace} ${dark ? style.dark : ''}`}
                    color="inherit"
                >
                    <HelpOutlineIcon fontSize="medium" />
                </IconButton>
            )}
            <InfoPop
                anchorEl={anchorEl}
                open={!!anchorEl}
                placement={placement}
            >
                {message}
                {keepOpen && (
                    <Button
                        onClick={handleClose}
                        className={style.closeButton}
                        color="inherit"
                        startIcon={<CloseIcon fontSize="small" />}
                        variant="outlined"
                    >
                        {closeLabel || 'Close'}
                    </Button>
                )}
            </InfoPop>
        </div>
    );
}
