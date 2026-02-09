import { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Loader2 } from 'lucide-react';
import styles from './CIDRCalculator.module.css';

export default function CIDRCalculator({ addToHistory }) {
    const [ip, setIp] = useState('');
    const [mask, setMask] = useState(24);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculate = async () => {
        if (!ip) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('/api/validate-cidr', { ip, mask });
            const data = response.data;

            if (data.valid) {
                setResult(data.cidrInfo);
                addToHistory({ ip: `${ip}/${mask}`, type: 'CIDR', status: 'Calculated', timestamp: new Date().toISOString() });
            } else {
                setError(data.message);
                addToHistory({ ip: `${ip}/${mask}`, type: 'CIDR', status: 'Failed', timestamp: new Date().toISOString() });
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
            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <label>IP Address</label>
                    <input
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="192.168.1.1"
                        className={styles.input}
                        onKeyDown={(e) => e.key === 'Enter' && calculate()}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Subnet Mask (/{mask})</label>
                    <input
                        type="range"
                        min="0"
                        max="32"
                        value={mask}
                        onChange={(e) => setMask(parseInt(e.target.value))}
                        className={styles.range}
                    />
                </div>

                <button onClick={calculate} disabled={loading} className={styles.button}>
                    {loading ? <Loader2 className={styles.spin} /> : <ArrowRight />}
                </button>
            </div>

            {error && (
                <div className={styles.error}>{error}</div>
            )}

            {result && (
                <div className={styles.grid}>
                    <ResultCard label="Network Address" value={result.networkAddress} />
                    <ResultCard label="Broadcast Address" value={result.broadcastAddress} />
                    <ResultCard label="Subnet Mask" value={result.subnetMask} />
                    <ResultCard label="Usable Hosts" value={result.numHosts.toLocaleString()} />
                    <ResultCard label="First Host" value={result.firstHost} />
                    <ResultCard label="Last Host" value={result.lastHost} />
                </div>
            )}
        </div>
    );
}

function ResultCard({ label, value }) {
    return (
        <div className={styles.card}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}
