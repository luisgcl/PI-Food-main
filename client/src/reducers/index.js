const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    id: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case 'GET_DIET':
               return {
                   ...state,
                diets: action.payload
               }
               case 'GET_NAME_GAMES':
                return {
                    ...state,
                    recipes: action.payload
                }
                case 'GET_ID':
                return {
                    ...state,
                    id: action.payload
                }
                case 'VACIAR_DETAIL':
                    return {
                        ...state,
                        id: []
                    }
                case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? state.recipes.sort((a, b) => {
                if (a.name > b.name) return 1
                if (b.name > a.name) return -1
                return 0
            }) :
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return -1
                    if (b.name > a.name) return 1
                    return 0
                })
                return {
                    ...state,
                    recipes: sortedArr
                }
                case 'ORDER_BY_SCORE':
            let sortScore = action.payload === 'menor' ? state.recipes.sort((a, b) => {
                if (a.score > b.score) return 1
                if (b.score > a.score) return -1
                return 0
            }) :
                state.recipes.sort((a, b) => {
                    if (a.score > b.score) return -1
                    if (b.score > a.score) return 1
                    return 0
                })
                return {
                    ...state,
                    recipes: sortScore
                }
                case 'FILTER_CREATED':

                    const createdFilter = action.payload === 'created' ? state.allRecipes.filter(el => el.createdInDb) : state.allRecipes.filter(el => !el.createdInDb)
        
                    return {
                        ...state,
                        recipes: createdFilter
                    }
                    case "DIET_FILTERED":
                        const allRecipes = state.allRecipes;
                        const dietFiltered =
                          action.payload === "all"
                            ? allRecipes
                            : allRecipes.filter((e) => e.diets.includes(action.payload))
                        return {
                          ...state,
                          recipes: dietFiltered,
                        }
                        case 'POST_GAME':
                            return {
                                ...state
                            }
            default:
            return state;
    }

}

export default rootReducer;