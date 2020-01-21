import React from 'react'
import styles from './notFound.module.scss'
import { Page404 } from 'assets/svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={styles.NotFound}>
            <div className={styles.NotFoundBody}>
                <Page404 />
                <p>
                    <Link to="/">
                        <button> Go to Dashboard </button>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default NotFound
