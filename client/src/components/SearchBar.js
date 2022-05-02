import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../actions';
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameRecipes(name)) 
        document.getElementById("formulario").reset();
    }

    return (
        <div>
            <form id='formulario' onSubmit={e => handleSubmit(e)}>
            <input 
                className={styles.search}
                type="text"
                placeholder='Buscar...'
                onChange={e => handleInputChange(e)}
            />
            <button className={styles.button} type='submit'>Buscar</button>
            </form>
        </div>
    )
}