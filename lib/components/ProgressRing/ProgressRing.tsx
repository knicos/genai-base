import style from './style.module.css';

interface Props {
    color?: string;
    fill?: string;
    outline?: string;
    radius?: number;
    round?: boolean;
    icon?: React.ReactNode;
    segments: number;
    completed: number;
}

export default function ProgressRing({
    color = "var(--primary-light)",
    fill = "white",
    outline = "var(--bg-dark)",
    radius = 40,
    segments,
    completed,
    round = true,
    icon
}: Props) {
    const circumference = 2 * Math.PI * radius;

    const gap = 4;
    const segmentLength = circumference / segments;
    const segmentDash = segmentLength - gap;

    const coverLength = completed * (segmentLength - gap);
    const delay = 390;

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle
                r={radius + 6}
                cx={50}
                cy={50}
                fill={fill}
            />
            <circle
                r={radius}
                cx={50}
                cy={50}
                fill="none"
                stroke={outline}
                strokeWidth={4}
                strokeLinecap={round ? 'round' : 'butt'}
                strokeDasharray={`1 9`}
                transform="rotate(-90 50 50)"
            />
            {completed > 0 && completed < segments && (
                <circle
                    r={radius}
                    cx={50}
                    cy={50}
                    fill="none"
                    stroke={fill}
                    strokeWidth={8}
                    strokeDasharray={`${coverLength} ${circumference}`}
                    transform="rotate(-90 50 50)"
                    className={style.cover}
                    style={{
                        animationDuration: `${completed * delay}ms`,
                        '--cover-length': coverLength,
                        '--circumference': circumference,
                    } as React.CSSProperties}
                />
            )}
            {completed >= segments ? (
                <circle
                    r={radius}
                    cx={50}
                    cy={50}
                    fill="none"
                    stroke={color}
                    strokeWidth={12}
                    className={style.complete}
                    transform="rotate(-90 50 50)"
                />
            ) : (
                Array.from({ length: completed }).map((_, i) => (
                    <circle
                        key={i}
                        r={radius}
                        cx={50}
                        cy={50}
                        fill="none"
                        stroke={color}
                        strokeWidth={12}
                        strokeDasharray={`${segmentDash} ${circumference}`}
                        strokeDashoffset={-i * segmentLength}
                        transform="rotate(-90 50 50)"
                        className={style.segment}
                        style={{
                            '--dash': segmentDash,
                            '--gap': circumference,
                            animationDelay: `${i * delay}ms`,
                        } as React.CSSProperties}
                    />
                ))
            )}
            {icon && (
                <foreignObject x={20} y={20} width={60} height={60}>
                    <div className={style.iconContainer}>
                        {icon}
                    </div>
                </foreignObject>
            )}
        </svg>
    );
}