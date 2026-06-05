import style from './style.module.css';

interface Props {
    size?: 'small' | 'normal' | 'large';
    disabled?: boolean;
    color?: 'normal' | 'dark' | 'secondary';
}

export default function Spinner({ size = 'normal', disabled, color = 'normal' }: Props) {
    return (
        <div
            className={`${size === 'large' ? style.largeSpinner : size === 'small' ? style.smallSpinner : style.spinner} ${
                disabled ? style.disabled : style.animated
            } ${color === 'dark' ? style.dark : color === 'secondary' ? style.second : ''}`}
            data-testid="spinner"
        />
    );
}
