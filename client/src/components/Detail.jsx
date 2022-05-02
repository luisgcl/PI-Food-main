import React from "react";
import { Link , useParams} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from "./Detail.module.css"

export default function DetailRecipe(){
    
    const dispatch = useDispatch()
    let { id }= useParams()
    const detailRecipe = useSelector((state) => state.id) 
  
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch,id])

    
    return (
        <div className={styles.container}>
            <div>
            {
                (detailRecipe.length === 0) ? 
                    <div className={styles.container}>
                        <p className={styles.loading}></p>
                    </div> 
                :
                    <div className={styles.box}>
                        <h1>{detailRecipe.name}</h1>
                        <img className={styles.image} src={detailRecipe[0].image ? detailRecipe[0].image : "https://s1.eestatic.com/2019/07/05/cocinillas/recetas/recetas_411470241_127377432_1706x960.jpg"} alt="No Found"/>
                        <h1 className={styles.mainTitle}>{detailRecipe.title}</h1>
                        <h3 className={styles.subTitle}>Summary</h3>
                        <p className={styles.info}>{detailRecipe[0].summary}</p>
                        <h3 className={styles.subTitle}>Steps</h3>
                        <p className={styles.info}>
                        {Array.isArray(detailRecipe[0].steps) ? 
                        detailRecipe[0].steps?.map((r, i)=> (<li key={i} className={styles.diets}>{r}  </li>)) 
                        : detailRecipe[0].steps}
                        </p>
                        
                        <h3 className={styles.subTitle}>Spoonacular Score</h3>
                        <p className={styles.info}>{detailRecipe[0].score}</p>
                        <h3 className={styles.subTitle}>Health Score</h3>
                        <p className={styles.info}>{detailRecipe[0].healthScore}</p>
                        <h3 className={styles.subTitle}>Diets</h3>
                        {Array.isArray(detailRecipe[0].diets) ?
                  detailRecipe[0].diets.map((el,i)=>{

                    return <div key={i}>
                      <p key={i}> {el.name}</p>
                        </div>
                  }): 

           
                      <p> {detailRecipe[0].diets}</p>
                
         
                }
                            
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