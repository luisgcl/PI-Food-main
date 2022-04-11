import React from 'react'

import styles from './Card.module.css'


export default function Card({name, image, diets}) {
return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image} 
            alt="not found" width="160px" height="250px"/>
            <h5>Tipo de dieta: {diets.map(el => el.name ? el.name : el).join(", ")}</h5>
        </div>
    </div>
    )
}