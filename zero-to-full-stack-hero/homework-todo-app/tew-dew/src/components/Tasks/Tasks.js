import { useState, useEffect } from 'react';

import { AddTask } from './AddTask';
import { TaskList } from './TaskList';

import styles from './Tasks.module.css';

export function Tasks() {
    const key = 'tew-dew-tasks';

    const [tasks, setTasks] = useState(() => {
        const saved = JSON.parse(localStorage.getItem(key));
        return saved || [];
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(tasks));
      }, [key, tasks]);


    const addTask = (item) => {
        if (!item) { return; }

        const task = {
            id: new Date().getMilliseconds(),
            label: item,
            done: false
        }

        setTasks([...tasks, task]);
    }

    const updateTask = (oldTask, newTask) => {
        setTasks(tasks.map(task => (task.label === oldTask.label) ? newTask : task));
    }

    const removeTask = (item) => {
        const updatedTasks = tasks.filter(task => task.label !== item.label);
        setTasks(updatedTasks);
    }

    return (
        <div className={styles.tasks}>
            <AddTask onAdd={addTask} />
            <TaskList onUpdate={updateTask} onRemove={removeTask} tasks={tasks} />
        </div>
    )
}
