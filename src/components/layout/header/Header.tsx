import React, { FC, useState } from 'react'
import { Search } from '@mui/icons-material'

import styles from './Header.module.css'

import logoImg from './logo.svg'
import { Link } from 'react-router-dom'

const Header: FC = () => {
	const [isSearchActive, setIsSearchActive] = useState(false)

	const onInputFocus = () => {
		setIsSearchActive(true);
	}

	const onInputBlur = () => {
		setIsSearchActive(false);
	}

	return (
        <header className={styles.header}>
            <Link to="/" className={styles['image-wrapper']}>
                <img src={logoImg} alt="" />
            </Link>
            <div className={styles.wrapper}>
                {!isSearchActive && <Search />}
                <input
                    type="text"
                    placeholder="Поиск"
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                />
            </div>
        </header>
    );
}

export default Header
