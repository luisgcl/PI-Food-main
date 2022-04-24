const { Router } = require('express');
require("dotenv").config();
const { validate: uuidValidate } = require("uuid");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5`);
    const apiInfo = await apiUrl.data.results?.map(el => {
        return {
            id: el.id,
            name: el.title,
            image: el.image,
            dishTypes: el.dishTypes,
            diets: el.diets.join(", "),
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0]?.steps.map(pos=>{
              return pos.step
          })
        };
    });
    return apiInfo;
}

const GetDbInfo = async () => {
  return await Recipe.findAll({
      include:{
          model: Diet,
          atributes: ["name"],
          through:{
              attributes: [],
          },
      }
  })
}

const getAllRecipes = async () => {
  let apiInfo = await getApiInfo();
  const dbInfo = await GetDbInfo();
  const infoTotal =apiInfo.concat(dbInfo);
  return infoTotal
}


router.get("/recipes", async (req, res) => {
  const { name } = req.query;
      const recipesTotal = await getAllRecipes()
  try{
      if (name) {
          let recipeTitle =  recipesTotal.filter((r) =>
              r.name.toLowerCase().includes(
                  name.toLowerCase())
          );
          recipeTitle.length
              ? res.status(200).json(recipeTitle)
              : res.status(400).send("This recipe doesn't exist");
      } else {
          res.status(200).json(recipesTotal);
      }
  }catch(error){
      console.log(error)
  }
  

});

router.get("/recipes/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const recipesTotals = await getAllRecipes()
      if (id) {
        let recipeId = await recipesTotals.filter((r) => r.id == id);
        recipeId.length
            ? res.status(200).json(recipeId)
            : res.status(404).send("Recipe not found");
    }
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/types", async (req, res) => {
    let allDiets = await Diet.findAll();
res.status(200).send(allDiets);
  })

  router.post('/recipe', async (req, res) => {
    try {
      let {
        name,
        summary,
        score,
        image,
        healthScore,
        // dishTypes,
        steps,
        diets,
        createdInDb
      } = req.body
    
      let recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        image,
        healthScore,
        // dishTypes,
        steps,
        createdInDb
      })
    
      let dietDb = await Diet.findAll({
        where: { name: diets }
      })
      console.log(dietDb)
      recipeCreated.addDiet(dietDb)
      res.send("receta creada con exito!")
    } catch(error){
      console.log(error)
    }
    
  })

module.exports = router;
