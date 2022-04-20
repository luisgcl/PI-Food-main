import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes, postRecipe } from '../actions';

import styles from './RecipeForm.module.css'

export default function RecipeForm () {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const recipes = useSelector(state => state.recipes);

    const [input, setInput] = useState({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        // dishTypes: [],
        diets: [],
        image: ""

    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSelect(e) {
        console.log(e.target.value)
        setInput({
            ...input,
            diets: input.diets.includes(e.target.value) ? input.diets : [...input.diets, e.target.value]
        })
    }

    function handleDelete(el) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (input.name === "" || input.name.length < 1) {
            return alert("Debe ingresar un nombre");
        }
        else if (
            recipes.find(
              (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
            )
          ) {
            return alert(`El nombre ${input.name} ya existe`);
          }
          else if (input.summary === "") {
              return alert("Resumen requerido");
          }
          else if (
            input.score === "" ||
            input.score < 1 ||
            input.score > 100
        ) {
            return alert("Coloca un Puntaje del 1 al 100");
        } 
        else if (
            input.healthScore === "" ||
            input.healthScore < 1 ||
            input.healthScore > 100
        ) {
            return alert("Coloca un nivel de comida saludable del 1 al 100");
        }
        else if (input.steps === "") {
            return alert("Coloca un paso a paso de la receta")
        }

        else if (input.diets.length === 0) {
            return alert("Coloca uno o más tipos de dieta");
        }  else {
            console.log(input)
            dispatch(postRecipe(input));
            alert("Receta creada!!");
            setInput({
                name: "",
                image: "",
                summary: "",
                score: "",
                healthScore: "",
                diets: [],
                steps: "",
            });
        }
    }


    useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())

    }, [dispatch])

    return (
        <div className={styles.divGames}>
            <Link to='/home'><button className={styles.homeButton}>Home</button></Link>
            <h1>Crea tu receta</h1>
            <form className={styles.allForm} onSubmit={e => handleSubmit(e)}>
               <div>
                   <label htmlFor="">Nombre: </label>
                   <input 
                   type="text" 
                   value={input.name}
                   name='name'
                   onChange={e => handleChange(e)}
                   />
               </div>

               <div>
                   <label htmlFor="">Resumen del plato: </label>
                   <textarea cols="30" rows="5"
                        value={input.summary}
                        name='summary'
                        onChange={e => handleChange(e)}
                    ></textarea>
               </div>

               <div>
                   <label htmlFor="">Puntuacion: </label>
                   <input 
                   type="number" 
                   value={input.score}
                   name='score'
                   onChange={e => handleChange(e)}
                   />
               </div>

               <div>
                   <label htmlFor="">Nivel de comida saludable: </label>
                   <input 
                   type="number" 
                   value={input.healthScore}
                   name='healthScore'
                   onChange={e => handleChange(e)}
                   />
               </div>

               <div>
                   <label htmlFor="">paso a paso: </label>
                   <textarea cols="30" rows="5"
                        value={input.steps}
                        name='steps'
                        onChange={e => handleChange(e)}
                    ></textarea>
               </div>

               <div className={styles.contentSelect}>
                    <label htmlFor="">Tipos de dieta: </label>
                    <select onChange={e => handleSelect(e)}>
                        {diets.map((d) => (
                            <option value={d.name} key={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <button className={styles.formButton} type='submit'>Crear receta</button>

            </form>

            <div>
                <h2>Tipo de dieta:</h2>
                {
                    input.diets.map(el =>
                        <div key={el}>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}