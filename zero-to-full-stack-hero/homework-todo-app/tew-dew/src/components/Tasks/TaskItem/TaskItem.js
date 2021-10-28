import React, { useRef, useState } from 'react'
import { PencilIcon, CheckIcon, XIcon, TrashIcon } from '@heroicons/react/solid'

import { check } from '../../../assets';

import styles from './TaskItem.module.css';

export function TaskItem({ onUpdate, onRemove, task }) {
    const editTaskInputRef = useRef(null);
    const [enableEdit, setEnableEdit] = useState(false);

    const onEdit = () => {
        setEnableEdit(true);
        editTaskInputRef.current.select();
    };

    const onCancelEdit = () => {
        editTaskInputRef.current.value = task.label;
        setEnableEdit(false);
    };

    const onSaveEdit = () => {
        editTaskInputRef.current.value = editTaskInputRef.current.value;

        const updatedTask = {
            id: task.id,
            label: editTaskInputRef.current.value,
            done: task.done
        };

        onUpdate(task, updatedTask);
        setEnableEdit(false);
    };

    const onCompletedToggle = () => {
        editTaskInputRef.current.value = editTaskInputRef.current.value;

        const updatedTask = {
            id: task.id,
            label: editTaskInputRef.current.value,
            done: !task.done
        };

        onUpdate(task, updatedTask);
        setEnableEdit(false);

    };


    const renderCompletedCheck = () => {
        if (task.done) {
            return (
                <img src={check} className={styles.taskItem__checkbox_done} alt='checked'></img>
            )
        }
    }

    const renderEditTaskActions = () => {
        let contentToRender;

        if (enableEdit && !task.done) {
            contentToRender = (
                <div>
                    <CheckIcon onClick={onSaveEdit} className={styles.taskItem__save} />
                    <XIcon onClick={onCancelEdit} className={styles.taskItem__cancel} />
                </div>
            );
        } else if (!task.done) {
            contentToRender = (
                <PencilIcon onClick={onEdit} className={styles.taskItem__edit} />
            );
        }

        return contentToRender;
    }


    return (
        <div className={styles.taskItem}>
            <div className={styles.taskItem__checkbox} onClick={onCompletedToggle}>
                { renderCompletedCheck() }
            </div>

            <input type='text' ref={editTaskInputRef}
                defaultValue={task.label}
                disabled={!enableEdit}
                className={`${styles.taskItem__input} ${task.done && styles.taskItem__input_completed}`}/>

            { renderEditTaskActions() }

            <div className={styles.taskItem__seperator}></div>

            <TrashIcon onClick={() => onRemove(task)} className={styles.taskItem__remove} />
        </div>
    )
}
