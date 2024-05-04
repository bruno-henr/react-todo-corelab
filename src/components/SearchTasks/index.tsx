import React from 'react';
import { useAppContext } from '../../context/AppContext';
import EditTask from '../EditTask';

import styles from './styles.module.scss';

const SearchTasks: React.FC = () => {
    const { dataFilter } = useAppContext();
    return (
        <div className={styles.mainContainer}>
            <div className={styles.divTitle}>
                <h2>{dataFilter.length} resultados encontrados...</h2>
            </div>
            <div className={styles.containerSearchTasks}>
                {dataFilter && dataFilter.map((task) => (
                    <EditTask task={task} key={task.id} />
                ))}
            </div>

        </div>
    );
}

export default SearchTasks;