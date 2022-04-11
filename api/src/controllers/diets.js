const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Se crea una constante que trae los tipos de dieta mediante un endpoint y con otra constante nos permite
//determinar si se encuentra datos en el modelo Diet o sino lo crea, sirve para almacenar los 
//datos de tipo de dietas en la base de datos

const getDiets = async () => {
    try {
        const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const types = await recipesApi.data.results?.map((t) => t.diets);
    // console.log(types)
    const diets = types.flat()
    const typeDiets = [...new Set(diets), "vegetarian"];
    typeDiets.forEach((d) => {
      Diet.findOrCreate({
        where: { name: d}
      });
    });
    }catch(error) {
        console.log(error)
    }
}

module.exports = getDiets;