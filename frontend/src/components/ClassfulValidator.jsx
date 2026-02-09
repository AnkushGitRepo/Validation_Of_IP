import { useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './ClassfulValidator.module.css';

export default function ClassfulValidator({ addToHistory }) {
    const [ip, setIp] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validate = async () => {
        if (!ip) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('/api/validate-classful', { ip });
            const data = response.data;

            if (data.valid) {
                setResult(data);
                addToHistory({ ip, type: 'Classful', status: 'Valid', timestamp: new Date().toISOString() });
            } else {
                setError(data.message);
                addToHistory({ ip, type: 'Classful', status: 'Invalid', timestamp: new Date().toISOString() });
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="Enter IP Address (e.g. 192.168.1.1)"
                    className={styles.input}
                    onKeyDown={(e) => e.key === 'Enter' && validate()}
                />
                <button onClick={validate} disabled={loading} className={styles.button}>
                    {loading ? 'Checking...' : 'Validate'}
                </button>
            </div>

            {error && (
                <div className={`${styles.result} ${styles.error}`}>
                    <XCircle size={24} />
                    <span>{error}</span>
                </div>
            )}

            {result && (
                <div className={`${styles.result} ${styles.success}`}>
                    <div className={styles.header}>
                        <CheckCircle size={24} />
                        <span>Valid IPv4 Address</span>
                    </div>

                    <div className={styles.infoGrid}>
                        <InfoCard label="Class" value={result.classInfo.classType} />
                        <InfoCard label="Type" value={result.classInfo.type} />
                        <InfoCard label="Range" value={result.classInfo.range} />
                    </div>

                    {result.classInfo.classType !== 'Invalid' && (
                        <div className={styles.grid}>
                            <DetailCard label="Network Address" value={result.classInfo.networkAddress} />
                            <DetailCard label="Broadcast Address" value={result.classInfo.broadcastAddress} />
                            <DetailCard label="Subnet Mask" value={result.classInfo.defaultMask} />
                            <DetailCard label="Usable Hosts" value={result.classInfo.usableHosts} />
                            <DetailCard label="First Host" value={result.classInfo.firstHost} />
                            <DetailCard label="Last Host" value={result.classInfo.lastHost} />
                        </div>
                    )}
                </div>
            )
            }
        </div >
    );
}

function DetailCard({ label, value, isCode }) {
    return (
        <div className={styles.card}>
            <span className={styles.label}>{label}</span>
            <span className={`${styles.value} ${isCode ? styles.code : ''}`}>{value}</span>
        </div>
    );
}

function InfoCard({ label, value, isCode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span className={styles.label} style={{ fontSize: '0.75rem' }}>{label}</span>
            <span className={`${styles.value} ${isCode ? styles.code : ''}`} style={{ fontSize: '0.95rem' }}>{value}</span>
        </div>
    );
}
