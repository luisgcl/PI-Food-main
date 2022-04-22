import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes, orderByName, orderByScore, filterCreated, dietFiltered } from '../actions';
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

import styles from './Home.module.css'

export default function Home () {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes)
    const diet = useSelector((state) => state.diets)
    const [currentPage, setCurrentPage] = useState(1)
    const [/*orden*/, setOrden] = useState()
    const [recipePerPage] = useState(9)
    const indexForLastRecipe = currentPage * recipePerPage
    const indexFortFirstRecipe = indexForLastRecipe - recipePerPage
    const currentRecipes = recipes.slice(indexFortFirstRecipe, indexForLastRecipe)

    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, [dispatch])

    const paginated = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }


    //Para cargar las recetas de nuevo
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
        setCurrentPage(1)
    }

    //Ordenar nombre ascendente y descendente
    function handleSort(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden( `Ordenado ${e.target.value}`)
    }

    //Ordenar score de mayor a menor y de menor a mayor
    function handleSortScore(e) {
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrden( `Ordenado ${e.target.value}`)
    }

    //Muestra los traido de la api y los creados
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    //Muestra el filtrado de las dietas
    function handleDietFiltered(e) {
        e.preventDefault()
        dispatch(dietFiltered(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={styles.container}>
            <div>

            {
                (recipes.length === 0) ?
                <div className={styles.loading}>
                    {/* <p>Loading...</p> */}
                </div> :

                <div>
                    <nav>
            <Link to='/recipe' className={styles.link}>Crear receta</Link>

            <button className={styles.button} onClick={e => { handleClick(e) }}>
                    cargar recetas
                </button>

            <div className={styles.contentSelect}>
                    <select onChange={e => handleSort(e)}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleSortScore(e)}>
                        <option value="mayor">Mayor Puntuacion</option>
                        <option value="menor">Menor Puntuacion</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value="Api">Existente</option>
                        <option value="created">Creados</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleDietFiltered(e)}>
                        {diet.map((d) => (
                            <option value={d.name} key={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <SearchBar />
            </nav>
            

           

                <hr className={styles.hr}/>

                <h1 className={styles.text}>Hello World</h1>

                <Paginated 
                 recipePerPage={recipePerPage}
                 recipes={recipes.length}
                 paginated={paginated}
                />

                <div className={styles.cards}>
                    {
                        currentRecipes?.map((c) => {
                            return (
                                <div className={styles.cards} key={c.id}>
                                     <Link to={"/recipes/" + c.id}>
                                    <Card 
                                    name={c.name}
                                    image={c.image}
                                    diets={c.diets}
                                    key={c.id}
                                    />
                                     </Link>   
                                </div>
                            )
                        })
                    }
                </div>

                <Paginated 
                 recipePerPage={recipePerPage}
                 recipes={recipes.length}
                 paginated={paginated}
                />
                </div>
            }
            </div>
            
        </div>

        
    )
}