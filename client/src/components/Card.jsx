import React from 'react'

import styles from './Card.module.css'


export default function Card({name, image, diets, score}) {
    let diet= ""
    if (diets) { 
        Array.isArray(diets) 
          ? (diet = diets.map(e => e.name).toString()) 
          : (diet = diets) 
    } 
    console.log("soy score ", score)
return (
    <div className={styles.box}>
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image ? image : "https://s1.eestatic.com/2019/07/05/cocinillas/recetas/recetas_411470241_127377432_1706x960.jpg"} 
            alt="not found" width="160px" height="250px"/>
            <h5>Tipo de dieta: {diet}</h5>
            <h3>{score}</h3>
        </div>
    </div>
    )
}