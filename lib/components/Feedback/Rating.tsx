import style from './Feedback.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useTranslation } from 'react-i18next';

interface Props {
    rating: number;
    onChange: (rating: number) => void;
}

export default function Rating({ rating, onChange }: Props) {
    const { t } = useTranslation();
    return (
        <div className={style.ratingContainer}>
            <h2>{t('feedback.ratingTitle')}</h2>
            <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`${style.star} ${i <= rating ? style.filled : ''}`}
                        onClick={() => onChange(i)}
                    >
                        {i <= rating ? <StarIcon fontSize="inherit" /> : <StarOutlineIcon fontSize="inherit" />}
                        {i === 1 && <div className={style.label}>{t('feedback.ratingVeryDissatisfied')}</div>}
                        {i === 5 && <div className={style.label}>{t('feedback.ratingVerySatisfied')}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
