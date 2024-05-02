import React from 'react';

import styles from './styles.module.scss'
import EditTask from '../EditTask';
import { useAppContext } from '../../context/AppContext';

const Tasks: React.FC = () => {
    const { tasks } = useAppContext();

    return (
        <div className={styles.mainContainer}>
            <div className={styles.divTitle}>
                <h2>Outras tarefas</h2>
            </div>
            <div className={styles.containerFavoriteTasks}>
                {tasks && tasks.map((task) => (
                    <EditTask task={task} key={task.id} />
                ))}
            </div>

        </div>
    );
}

export default Tasks;