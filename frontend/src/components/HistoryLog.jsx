import { Clock, Check, X } from 'lucide-react';
import styles from './HistoryLog.module.css';

export default function HistoryLog({ history }) {
    if (!history || history.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                <Clock size={16} />
                Recent Checks
            </h3>
            <div className={styles.list}>
                {history.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.icon}>
                            {item.status === 'Valid' || item.status === 'Calculated' ?
                                <Check size={14} className={styles.success} /> :
                                <X size={14} className={styles.error} />
                            }
                        </div>
                        <div className={styles.info}>
                            <span className={styles.ip}>{item.ip}</span>
                            <span className={styles.meta}>{item.type} • {new Date(item.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
