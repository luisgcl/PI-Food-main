import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div className={styles.landing}>
            <div className={styles.center}>
            <h1>World recipes</h1>
            <Link to="/home">
                <button className={styles.button}>Start</button>
            </Link>
            </div>
        </div>
    )
}