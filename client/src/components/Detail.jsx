import React from "react";
import { Link , useParams} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getDetail, vaciarDetail } from "../actions";
import styles from "./Detail.module.css"

export default function DetailRecipe(){
    
    const dispatch = useDispatch()
    let { id }= useParams()
    const detailRecipe = useSelector((state) => state.id) 
    console.log(id)
    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(vaciarDetail())
        }
    },[dispatch,id])

    return (
        <div className={styles.container}>
            <div>
            {
                (detailRecipe.length === 0) ? 
                    <div className={styles.container}>
                        <p className={styles.loading}>Loading ...</p>
                    </div> 
                :
                    <div className={styles.box}>
                        <h1>{detailRecipe.name}</h1>
                        <img className={styles.image} src={detailRecipe.image ? detailRecipe.image : "https://www.vidasostenible.org/wp-content/uploads/2018/06/tresplatoscocinasostenible.jpg"} alt="No Found"/>
                        <h1 className={styles.mainTitle}>{detailRecipe.title}</h1>
                        <h3 className={styles.subTitle}>Summary</h3>
                        <p className={styles.info}>{detailRecipe.summary}</p>
                        <h3 className={styles.subTitle}>Steps</h3>
                        <p className={styles.info}>
                        {Array.isArray(detailRecipe.steps) ? 
                        detailRecipe.steps?.map(r => (<li key={r.id} className={styles.diets}>{r.number} {r.step}  </li>)) 
                        : detailRecipe.steps}
                        </p>
                        
                        <h3 className={styles.subTitle}>Spoonacular Score</h3>
                        <p className={styles.info}>{detailRecipe.score}</p>
                        <h3 className={styles.subTitle}>Health Score</h3>
                        <p className={styles.info}>{detailRecipe.healthScore}</p>
                        <h3 className={styles.subTitle}>Diets</h3>
                        <p className={styles.info}>{ detailRecipe.diets[0] instanceof String ?
                        detailRecipe.diets.map(d => d).join(", ") : detailRecipe.diets.map(d => d.name).join(", ")}</p>
                            
                    </div>
                    
                
            }
            </div>
            <div className={styles.boxButton}>
                <Link to="/home">
                    <button className={styles.button} >Go back!</button>
                </Link>
            </div>
        </div>
    )

}