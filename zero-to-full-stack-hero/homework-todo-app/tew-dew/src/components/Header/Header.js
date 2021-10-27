import React from 'react'
import { logo } from '../../assets';

import styles from './Header.module.css';

export function Header() {
    return (
        <div className={styles.header}>
            <img src={logo} className={styles.header__logo} alt='logo'></img>
        </div>
    )
}
