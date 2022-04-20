import React from 'react'

import styles from './Card.module.css'


export default function Card({name, image, diets}) {
return (
    <div className={styles.box}>
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image} 
            alt="not found" width="160px" height="250px"/>
            

            
        </div>
    </div>
    )
}