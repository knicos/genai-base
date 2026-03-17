import { useTranslation } from 'react-i18next';
import style from './Feedback.module.css';

interface Props {
    rating: number;
    onChange: (rating: number) => void;
}

export default function Recommend({ rating, onChange }: Props) {
    const { t } = useTranslation();
    return (
        <div className={style.ratingContainer}>
            <h2>{t('feedback.recommendTitle')}</h2>
            <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={style.boxContainer}
                    >
                        <div
                            className={`${style.box} ${style['box' + i]} ${i === rating ? style.filled : ''}`}
                            onClick={() => onChange(i)}
                        >
                            {`${i}`}
                        </div>
                        {i === 1 && <div className={style.label}>{t('feedback.recommendVeryUnlikely')}</div>}
                        {i === 5 && <div className={style.label}>{t('feedback.recommendVeryLikely')}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
