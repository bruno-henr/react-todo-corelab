import React from 'react';

import styles from './styles.module.scss'
import EditTask from '../EditTask';
import { Task, useAppContext } from '../../context/AppContext';

const FavoriteTasks: React.FC = () => {
    const { favoriteTasks } = useAppContext();

    return (
        <div className={styles.mainContainer}>
            <div className={styles.divTitle}>
                <h2>Favoritos</h2>
            </div>
            <div className={styles.containerFavoriteTasks}>
                {favoriteTasks && favoriteTasks.map((t: Task) => (
                    <EditTask task={t} key={t.id} />
                ))}
            </div>

        </div>
    );
}

export default FavoriteTasks;