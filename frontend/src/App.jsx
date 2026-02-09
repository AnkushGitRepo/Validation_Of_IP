import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ClassfulValidator from './components/ClassfulValidator';
import CIDRCalculator from './components/CIDRCalculator';
import HistoryLog from './components/HistoryLog';
import IPTheory from './components/IPTheory';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('classful');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('ip_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const addToHistory = (newItem) => {
    const updated = [newItem, ...history].slice(0, 5); // Keep last 5
    setHistory(updated);
    localStorage.setItem('ip_history', JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.content}>
          {activeTab === 'classful' ? (
            <ClassfulValidator addToHistory={addToHistory} />
          ) : (
            <CIDRCalculator addToHistory={addToHistory} />
          )}
        </div>

        <HistoryLog history={history} />

        <IPTheory activeTab={activeTab} />
      </main>
    </div>
  );
}

export default App;
