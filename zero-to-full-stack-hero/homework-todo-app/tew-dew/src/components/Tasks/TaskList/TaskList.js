import React, { useState, useEffect } from 'react/cjs/react.development';
import { TaskItem } from '../TaskItem';

import styles from './TaskList.module.css';


export function TaskList({onUpdate, onRemove, tasks}) {
    const [listOfTasks, setListOfTasks] = useState([]);

    useEffect(() => {
        setListOfTasks(tasks);
    }, [tasks]);

    return (
        <div className={styles.taskList}>
        { tasks.length ?
            <div className={styles.taskList}>
                {listOfTasks.map((task, idx) => (
                    <TaskItem key={task.id} onUpdate={onUpdate} onRemove={onRemove} task={task} />
                ))}
            </div>
        :
            <div className={styles.taskList__noTasks}>
                You have no items to do
            </div>
        }
        </div>
    )
}
