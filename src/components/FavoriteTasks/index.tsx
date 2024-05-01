import React from 'react';

import styles from './styles.module.scss'
import EditTask from '../EditTask';

const FavoriteTasks: React.FC = () => {
    const a = [1, 2, 3, 4, 5];

    return (
        <div className={styles.mainContainer}>
            <div className={styles.divTitle}>
                <h2>Favoritos</h2>
            </div>
            <div className={styles.containerFavoriteTasks}>
                {a.map(() => (
                    <EditTask />
                ))}
            </div>

        </div>
    );
}

export default FavoriteTasks;