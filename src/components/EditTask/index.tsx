import React, { useState } from 'react';

import styles from './styles.module.scss'
import { IoStarOutline } from 'react-icons/io5';
import PalletColors from '../PalletColors';
import { IoIosStar } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose, MdOutlineEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'sonner';

interface IProps {
    colorDefault?: string;
}
const EditTask: React.FC<IProps> = ({
    colorDefault = "#fff"
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [colorSelected, setColorSelected] = useState(colorDefault);
    const [editing, setEditing] = useState(false);

    return (
        <div className={styles.container} style={{ background: colorSelected }}>
            <div className={styles.headerCard}>
                <input type="text" placeholder='Titulo' onChange={() => {
                    setEditing(true)
                }} />
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
                                onClick={() => setIsFavorite(true)}
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
                                onClick={() => setIsFavorite(false)}
                            />
                        </motion.div>
                    }
                </div>
            </div>
            <div className={styles.contentBox}>
                <textarea placeholder='Criar nota...' rows={4} cols={64}>

                </textarea>
            </div>
            <div className={styles.containerFooter}>
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
                                paddingLeft: '1rem'
                            }}>
                            <div>
                                <FaCheck
                                    size={22}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        toast.success('Nota atualizada')
                                        setEditing(false)
                                    }}
                                />
                            </div>

                            <div>
                                <MdClose
                                    size={26}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setEditing(false)
                                    }}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                <div>
                    <PalletColors
                        onChange={(color: string) => setColorSelected(color)}
                        smallIcon={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditTask;