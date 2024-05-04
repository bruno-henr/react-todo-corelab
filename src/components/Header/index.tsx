import React from 'react';

import styles from './styles.module.scss';
import logo from '../../assets/logo.png'
import { GoSearch } from 'react-icons/go';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
    const { setSearch } = useAppContext();

    return (
        <div className={styles.container}>
            <div className={styles.flex50}>

                <div className={styles['flex-align']}>
                    <img src={logo} width={'56px'} height={'56px'} alt="" />
                    <p>CoreNotes</p>
                </div>

                <div className={styles['box-input-search']}>
                    <input
                        type="text"
                        placeholder='Pesquisar notas'
                        onChange={({ target }) => setSearch(target.value)}
                    />
                    <div className={styles.divIcon}>
                        <GoSearch size={27} color='#9E9E9E' />
                    </div>
                </div>
            </div>

            <div className={styles.flex1}>
                <button>
                    <IoCloseSharp size={30} color='#8a8888' />
                </button>
            </div>
        </div>
    );
}

export default Header;