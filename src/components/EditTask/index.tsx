import React, { useState } from 'react';

import styles from './styles.module.scss'
import { IoStarOutline } from 'react-icons/io5';
import PalletColors from '../PalletColors';
import { IoIosStar } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineEdit } from 'react-icons/md';
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { Task, useAppContext } from '../../context/AppContext';
import { toast } from 'sonner';

interface IProps {
    colorDefault?: string;
    task: Task;
}
const EditTask: React.FC<IProps> = ({
    colorDefault = "#fff",
    task
}) => {
    const { updateTaskMutation, rollbackTask, deleteTaskMutation, handleRemoveTask } = useAppContext();
    const [isFavorite, setIsFavorite] = useState(task.favorite ?? false);
    const [colorSelected, setColorSelected] = useState(task.color ?? colorDefault);
    const [editing, setEditing] = useState(false);
    const [taskForm, setTaskForm] = useState<Task>(task);

    const handleUpdateTask = () => {
        updateTaskMutation.mutate({
            id: taskForm.id,
            color: colorSelected,
            favorite: isFavorite,
            content: taskForm.content,
            title: taskForm.title
        })
        setEditing(false);
    }

    const handleDeleteTask = () => {
        console.log('id do removido ', taskForm.id)

        handleRemoveTask(taskForm.id);

        const timeoutId = setTimeout(() => {
            deleteTaskMutation.mutate(taskForm.id);
        }, 6000);

        toast('Nota removida com sucesso', {
            action: {
                label: 'Voltar',
                onClick: () => {
                    clearTimeout(timeoutId);
                    rollbackTask();
                }
            },
            duration: 5000
        });
    }

    return (
        <motion.div
            initial={{ scale: 0.6, }}
            animate={{ scale: 1, }}
            exit={{ scale: 0.6 }}
            className={styles.container}
            style={{ background: colorSelected }}
        >
            <div className={styles.headerCard}>
                <input
                    type="text"
                    placeholder='Titulo'
                    value={taskForm.title}
                    onChange={({ target }) => {
                        setTaskForm({ ...taskForm, title: target.value });
                        setEditing(true);
                    }}
                />
                <div className={styles.icon}>
                    {!isFavorite &&
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <IoStarOutline
                                size={22}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setIsFavorite(true);
                                    setEditing(true);
                                }}
                            />
                        </motion.div>
                    }
                    {isFavorite &&
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <IoIosStar
                                style={{ cursor: 'pointer' }}
                                color='#fcd34d' size={22}
                                onClick={() => {
                                    setIsFavorite(false);
                                    setEditing(true);
                                }}
                            />
                        </motion.div>
                    }
                </div>
            </div>
            <div className={styles.contentBox}>
                <textarea
                    placeholder='Criar nota...'
                    value={taskForm.content}
                    onChange={({ target }) => {
                        setTaskForm({ ...taskForm, content: target.value });
                        setEditing(true);
                    }}
                    rows={4}
                    cols={64}
                >

                </textarea>
            </div>
            <div className={styles.containerFooter}>
                <div className={styles.footerDiv1}>
                    {!editing && <button className={styles.noActionBtnEdit}>
                        <MdOutlineEdit size={32} />
                    </button>}
                    {editing && (
                        <AnimatePresence>
                            <motion.div layout
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                }}>
                                <div>
                                    <FaCheck
                                        size={22}
                                        style={{ cursor: 'pointer' }}
                                        color='#58c97b'
                                        onClick={() => handleUpdateTask()}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}


                    <PalletColors
                        onChange={(color: string) => {
                            setColorSelected(color);
                            setEditing(true);
                        }}
                        smallIcon={true}
                    />
                </div>

                <div className={styles.divDeleteTask}>
                    <FaRegTrashAlt
                        size={26}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteTask()}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default EditTask;