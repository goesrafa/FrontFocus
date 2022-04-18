import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import {FiLogOut} from 'react-icons/fi'

import {AuthContext} from '../../contexts/AuthContext'

export function  Header(){
    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo4.svg" width={250} height={120} />
                </Link>

                

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <a>Categoria</a>
                    </Link>

                    <Link href="/courses">
                        <a>Cursos</a>
                    </Link>

                        <button onClick={signOut}>
                            <FiLogOut  color='#fff' size={24}/>
                        </button>

                </nav>
            </div>
        </header>
    )
}