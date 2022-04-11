import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
// import styles from './Detail.module.css'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getId, vaciarDetail } from '../actions';


export default function Detail() {
    const dispatch = useDispatch()
    let { id } = useParams();
    const recipeId = useSelector((state) => state.id)
    
    
    useEffect(() => {
        dispatch(getId(id))
        return () => {
            dispatch(vaciarDetail())
        }
    }, [dispatch, id])
 
    return (
        <div>
            <div>
                {console.log(recipeId)}
            <h3>{recipeId.name}</h3>
            <img src={recipeId.image ? recipeId.image : 'https://www.trecebits.com/wp-content/uploads/2019/04/11854.jpg'} alt="img not found" width="200px" height="250px" />
            <h3>Tipos de dieta: {recipeId.diets?.map(d => d) + ", "}</h3>
            <h3>Resumen del plato: {recipeId.summary}</h3>
            <h3>Paso a paso: {recipeId.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step
                }
            })}</h3>
            <h5>Puntuacion: {recipeId.score}</h5>
            <h4>Nivel de comida saludable: {recipeId.healthScore}</h4>
            </div>
           
            <Link to= '/home'><button>Volver</button></Link>
        </div>
    );
}