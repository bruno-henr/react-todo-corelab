import React, { useState } from 'react';

import styles from './styles.module.scss'
import { IoStarOutline } from 'react-icons/io5';
import PalletColors from '../PalletColors';
import { IoIosStar } from 'react-icons/io';
import { motion } from 'framer-motion'
import { useAppContext } from '../../context/AppContext';
interface CreateTask {
    title: string,
    content: string,
    favorite: boolean,
    color: string
}

const AddNewTask: React.FC = () => {
    const { addNewTaskMutation } = useAppContext();

    const [clicked, setClicked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [colorSelected, setColorSelected] = useState('#fff');
    const [taskForm, setTaskForm] = useState<CreateTask>({
        color: '#fff',
        content: '',
        favorite: false,
        title: ''
    });

    const resetForm = () => {
        setTaskForm({
            color: '#fff',
            content: '',
            favorite: false,
            title: ''
        });
        setColorSelected('#fff');
        setIsFavorite(false);
    }

    const handleAddNewTask = () => {
        addNewTaskMutation.mutate({
            color: colorSelected,
            content: taskForm.content,
            favorite: isFavorite,
            title: taskForm.title
        });
        resetForm();
    }

    return (
        <div className={styles.container} style={{ background: colorSelected }}>
            <div className={styles.headerCard}>
                <input
                    type="text"
                    placeholder='Titulo'
                    value={taskForm.title}
                    onChange={({ target }) => setTaskForm({ ...taskForm, title: target.value })}
                />
                <div className={styles.icon}>
                    {!isFavorite &&
                        (
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
                                    size={32}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setIsFavorite(true)}
                                />
                            </motion.div>

                        )
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
                                color='#fcd34d' size={32}
                                onClick={() => setIsFavorite(false)}
                            />
                        </motion.div>
                    }
                </div>
            </div>
            <div className={styles.contentBox}>
                <textarea
                    value={taskForm.content}
                    onChange={({ target }) =>
                        setTaskForm({ ...taskForm, content: target.value })}
                    placeholder='Criar nota...'
                    rows={4} cols={164}
                >

                </textarea>
            </div>
            <div className={styles.containerFooter}>
                <button
                    className={clicked ?
                        styles.animate + ' ' + styles.buttonSave :
                        styles.buttonSave
                    }
                    onClick={() => {
                        setClicked(true);
                        handleAddNewTask()
                        setTimeout(() => {
                            setClicked(false);
                        }, 500);
                    }}
                >
                    Salvar nota
                </button>


                <div>
                    <PalletColors
                        onChange={(color: string) => setColorSelected(color)}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddNewTask;