import style from './PercentageBar.module.css';

export type Colours = 'purple' | 'green' | 'blue' | 'red' | 'orange';

interface Props {
    colour: Colours;
    value: number;
    hideLabel?: boolean;
    orientation?: 'horizontal' | 'vertical';
    thickness?: number;
    style?: React.CSSProperties;
}

export default function PercentageBar({ colour, value, hideLabel, orientation, thickness, style: cssStyle }: Props) {
    const pc = Math.round(value);

    return (
        <div
            className={`${style.outer} ${style[colour]} ${style[orientation || 'horizontal']}`}
            style={
                thickness
                    ? orientation === 'vertical'
                        ? { width: `${thickness}px`, ...cssStyle }
                        : { height: `${thickness}px`, ...cssStyle }
                    : cssStyle
            }
        >
            <div
                className={`${style.progress} ${style[colour]}`}
                style={orientation === 'vertical' ? { height: `${pc}%` } : { width: `${pc}%` }}
            ></div>
            {!hideLabel && (
                <div
                    className={style.label}
                    style={orientation === 'vertical' ? { height: `${pc}%` } : { width: `${pc}%` }}
                >
                    {`${pc}%`}
                </div>
            )}
        </div>
    );
}
