import { InformationCircleIcon } from '@heroicons/react/solid'

import styles from './Message.module.css';


export function Message({message}) {
    return (
        <div className={styles.message}>
            <label className={`${styles.message__text} ${styles[message.type]}`}>
                {message.text}
            </label>
        </div>
    )
}


