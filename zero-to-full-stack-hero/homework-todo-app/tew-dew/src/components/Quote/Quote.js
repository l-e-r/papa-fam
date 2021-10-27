import { useEffect, useState } from 'react';

import styles from './Quote.module.css';

export function Quote() {
    const [quote, setQuote] = useState({});

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            const min = 1;
            const max = data.length;
            const idx = Math.floor(min + Math.random() * (max - min));
            setQuote(data[idx]);
        })
    }, []);

    return (
        <div className={styles.quote}>
            <div className={styles.quote__text}>{quote.text}</div>
            <div className={styles.quote__author}>{quote.author}</div>
        </div>
    )
}
