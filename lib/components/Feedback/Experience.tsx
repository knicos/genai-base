import { TextField } from '@mui/material';
import style from './Feedback.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
    experience: string;
    onChange: (experience: string) => void;
}

export default function Experience({ experience, onChange }: Props) {
    const { t } = useTranslation();
    return (
        <div className={style.experienceContainer}>
            <h2>{t('feedback.experienceTitle')}</h2>
            <TextField
                multiline
                rows={4}
                value={experience}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
            />
        </div>
    );
}
