import LinkButton from './LinkButton';
import style from './style.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';

interface Props {
    logoUrl?: string;
    title: string;
    subtitle: string;
    githubUrl?: string;
    githubLabel?: string;
    teachingMaterialsUrl?: string;
    teachingMaterialsLabel?: string;
}

export default function HomeBanner({
    logoUrl,
    title,
    subtitle,
    githubUrl,
    githubLabel,
    teachingMaterialsUrl,
    teachingMaterialsLabel,
}: Props) {
    return (
        <div className={style.header}>
            <img
                src={logoUrl || '/logo192.png'}
                alt="GenAI logo"
                width={192}
                height={192}
            />
            <div className={style.headerColumn}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <div className={style.buttons}>
                    {teachingMaterialsUrl && teachingMaterialsLabel && (
                        <LinkButton
                            href={teachingMaterialsUrl}
                            startIcon={<SchoolIcon />}
                        >
                            {teachingMaterialsLabel}
                        </LinkButton>
                    )}
                    {githubUrl && githubLabel && (
                        <LinkButton
                            href={githubUrl}
                            startIcon={<GitHubIcon />}
                        >
                            {githubLabel}
                        </LinkButton>
                    )}
                </div>
            </div>
        </div>
    );
}
