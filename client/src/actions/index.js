import axios from "axios";

export function getRecipes() {
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getDiets() {
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_DIET',
            payload: json.data
        })
    }
}

export function getNameRecipes(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + name);
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {
    return async (dispatch) => {
        let json = await axios.get(`http://localhost:3001/recipes/`+id);
        return dispatch({
            type: 'GET_ID',
            payload: json.data
        })
    }
}



export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function filterCreated(payload) {
  
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function dietFiltered(payload) {
    return {
        type: 'DIET_FILTERED',
        payload
    }
}
export function buttonDiet(payload) {
    return {
        type: 'BUTTON_DIET',
        payload
    }
}

export function postRecipe(payload) {
    return async function() {
        const response = await axios.post("http://localhost:3001/recipe", payload);
        return response;
    }
}