import React, { useRef, useState } from 'react';
import { XIcon, PlusIcon } from '@heroicons/react/solid'


import styles from './AddTask.module.css';

export function AddTask({onAdd}) {
    const newTaskInputRef = useRef('');
    const [hasNewTaskInput, setHasNewTaskInput] = useState('');


    const updateTaskInput = () => {
        setHasNewTaskInput(newTaskInputRef.current.value.length > 0);
    }

    const onClearTaskInput = () => {
        newTaskInputRef.current.value = '';
        resetHasNewTaskInput();
    }

    const onClickAdd = (e) => {
        e.preventDefault();
        if (!newTaskInputRef.current.value) { return; }

        /* TODO: make sure a duplicate entry can be added */

        onAdd(newTaskInputRef.current.value);
        newTaskInputRef.current.value = null;
        resetHasNewTaskInput();
    }

    const resetHasNewTaskInput = () => {
        setHasNewTaskInput('');
    }


    return (
        <form onSubmit={(e) => onClickAdd(e)} className={styles.addTask}>
            <input type='text' ref={newTaskInputRef} onChange={updateTaskInput} className={styles.addTask__input}/>
            {newTaskInputRef.current.value ? 
                <XIcon className={styles.addTask__clear} onClick={onClearTaskInput} />
            : null}
            <div className={styles.addTask__seperator} />
            <PlusIcon type='submit' className={styles.addTask__add} onClick={(e) => onClickAdd(e)} />
        </form>
    )
}
