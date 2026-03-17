import { Button } from '@base/main';
import { CSSProperties, useEffect, useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { useTranslation } from 'react-i18next';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

interface Props {
    application: string;
    delay?: number; // in milliseconds
    className?: string;
    style?: CSSProperties;
    variant?: 'contained' | 'outlined' | 'text';
}

export default function Feedback({ application, delay, className, style, variant }: Props) {
    const { t } = useTranslation();
    const [showButton, setShowButton] = useState(false);
    const [token, setToken] = useState('');
    const [open, setOpen] = useState(false);
    // Check from local storage if feedback has already been submitted
    const hasSubmitted = localStorage.getItem('feedbackSubmitted') === 'true';

    // If feedback not submitted, wait for 5 minutes and then show feedback button
    useEffect(() => {
        if (!hasSubmitted) {
            const timer = setTimeout(
                () => {
                    const apiAddress = import.meta.env.VITE_FEEDBACK_URL;

                    if (apiAddress) {
                        fetch(`${apiAddress}`)
                            .then((res) => res.json())
                            .then((data) => {
                                setToken(data.token);
                                setShowButton(true);
                            })
                            .catch(() => {
                                console.warn('Feedback denied');
                            });
                    }
                },
                delay ?? 5 * 60 * 1000
            ); // 5 minutes

            return () => clearTimeout(timer);
        }
    }, [hasSubmitted, delay]);

    return (
        <>
            {showButton && (
                <Button
                    variant={variant ?? 'contained'}
                    onClick={() => setOpen(true)}
                    className={className}
                    style={style}
                    startIcon={<ThumbsUpDownIcon />}
                >
                    {t('feedback.button')}
                </Button>
            )}
            <FeedbackForm
                open={open}
                onClose={() => setOpen(false)}
                onDone={() => {
                    localStorage.setItem('feedbackSubmitted', 'true');
                    setShowButton(false);
                }}
                token={token}
                application={application}
            />
        </>
    );
}
