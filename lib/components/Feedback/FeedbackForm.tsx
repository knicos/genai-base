import { Dialog, DialogActions, DialogContent } from '@mui/material';
import style from './Feedback.module.css';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import Rating from './Rating';
import Recommend from './Recommend';
import Experience from './Experience';
import { useTranslation } from 'react-i18next';

const THANK_YOU_IMAGE = 'https://store.gen-ai.fi/common/thank_you_graphic.jpg';

interface Props {
    token: string;
    application: string;
    open?: boolean;
    apiUrl: string;
    onClose?: () => void;
    onDone?: () => void;
}

function validate(rating: number, recommend: number, experience: string) {
    if (rating <= 0 || rating > 5) return false;
    if (recommend <= 0 || recommend > 5) return false;
    if (experience.length > 1000) return false;
    return true;
}

export default function FeedbackForm({ application, open, onClose, token, onDone, apiUrl }: Props) {
    const { t } = useTranslation();
    const [rating, setRating] = useState(0);
    const [recommend, setRecommend] = useState(0);
    const [experience, setExperience] = useState('');
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const hasPreloadedThankYouRef = useRef(false);

    // Preload
    useEffect(() => {
        if (!open || hasPreloadedThankYouRef.current) return;

        const img = new Image();
        img.src = THANK_YOU_IMAGE;
        hasPreloadedThankYouRef.current = true;
    }, [open]);

    const validated = validate(rating, recommend, experience);

    const doSubmit = () => {
        if (apiUrl) {
            fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    application,
                    rating,
                    recommend,
                    describe: experience,
                    valuableFeature: '',
                    suggestions: '',
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        setError(true);
                    } else {
                        setDone(true);
                        if (onDone) onDone();
                    }
                })
                .catch(() => {
                    setError(true);
                });
        }
    };

    const doClose = () => {
        if (onClose) onClose();
        setTimeout(() => {
            setDone(false);
            setError(false);
            setRating(0);
            setRecommend(0);
            setExperience('');
        }, 500);
    };

    return (
        <Dialog
            open={open ?? false}
            onClose={doClose}
        >
            <DialogContent className={style.feedback}>
                {!done && !error && (
                    <>
                        <h1>{t('feedback.title')}</h1>
                        <Rating
                            rating={rating}
                            onChange={setRating}
                        />
                        <Recommend
                            rating={recommend}
                            onChange={setRecommend}
                        />
                        <Experience
                            experience={experience}
                            onChange={setExperience}
                        />
                    </>
                )}
                {done && (
                    <div className={style.thankYouBox}>
                        <img
                            src={THANK_YOU_IMAGE}
                            alt={t('feedback.thankYou')}
                        />
                    </div>
                )}
                {error && (
                    <div className={style.messageBox}>
                        <h1>{t('feedback.error')}</h1>
                        <p>{t('feedback.errorMessage')}</p>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant={!done && !error ? 'outlined' : 'contained'}
                    onClick={doClose}
                >
                    {t('feedback.close')}
                </Button>
                {!done && !error && (
                    <Button
                        variant="contained"
                        onClick={doSubmit}
                        disabled={!validated}
                    >
                        {t('feedback.send')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
