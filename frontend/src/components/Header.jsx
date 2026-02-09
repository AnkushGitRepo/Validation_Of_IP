import { ShieldCheck, Github } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.topRow}>
                <div className={styles.logo}>
                    <ShieldCheck size={32} className={styles.icon} />
                    <h1>Validation Of IP</h1>
                </div>
                <a
                    href="https://github.com/AnkushGitRepo/Validation_Of_IP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                    aria-label="View on GitHub"
                >
                    <Github size={24} />
                    <span>GitHub</span>
                </a>
            </div>
            <p className={styles.subtitle}>Advanced IPv4 Analysis & CIDR Calculator</p>
        </header>
    );
}
