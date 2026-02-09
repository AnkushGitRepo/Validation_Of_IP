import styles from './Tabs.module.css';
import { Network, Calculator } from 'lucide-react';

export default function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className={styles.tabs}>
            <button
                className={`${styles.tab} ${activeTab === 'classful' ? styles.active : ''}`}
                onClick={() => setActiveTab('classful')}
            >
                <Network size={18} />
                Classful Validator
            </button>
            <button
                className={`${styles.tab} ${activeTab === 'cidr' ? styles.active : ''}`}
                onClick={() => setActiveTab('cidr')}
            >
                <Calculator size={18} />
                CIDR Calculator
            </button>
        </div>
    );
}
