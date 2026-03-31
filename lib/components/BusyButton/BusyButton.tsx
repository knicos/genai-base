import { forwardRef, PropsWithChildren } from 'react';
import { Button } from '../Button/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps } from '@mui/material';

interface Props extends PropsWithChildren<ButtonProps> {
    busy?: boolean;
}

export default forwardRef<HTMLButtonElement, Props>(function BusyButton({ busy, ...props }: Props, ref) {
    return (
        <Button
            ref={ref}
            {...props}
            disabled={busy || props.disabled}
            sx={{
                ...props.sx,
                '& .MuiCircularProgress-root': {
                    width: '20px !important',
                    height: '20px !important',
                },
            }}
            startIcon={busy ? <CircularProgress /> : props.startIcon}
        >
            {props.children}
        </Button>
    );
});
