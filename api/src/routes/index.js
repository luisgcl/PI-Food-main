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
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results?.map(el => {
        return {
            id: el.id,
            name: el.title,
            image: el.image,
            dishTypes: el.dishTypes,
            diets: el.diets.join(""),
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
      const id = req.params.id;
      if (!uuidValidate(id)) {
        const recipeId = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const recipeInfo = {
          id: recipeId.data.id,
          name: recipeId.data.title,
          image: recipeId.data.image,
          summary: recipeId.data.summary,
          score: recipeId.data.spoonacularScore,
          healthScore: recipeId.data.healthScore,
          dishTypes: recipeId.data.dishTypes,
          diets: recipeId.data.diets,
          steps: recipeId.data.analyzedInstructions[0]?.steps.map((el) => {
            return {
              number: el.number,
              step: el.step,
            };
          }),
        };
        recipeInfo
          ? res.status(200).send(recipeInfo)
          : res.status(404).send("No existe el ID ingresado!!");
      } else {
        const recipeDb = await Recipe.findByPk(id, {
          include: Diet,
        });
        const recipeIdDb = {
          id: recipeDb.id,
          name: recipeDb.name,
          image: recipeDb.image,
          summary: recipeDb.summary,
          score: recipeDb.score,
          healthScore: recipeDb.healthScore,
          // dishTypes: recipeDb.dishTypes,
          diets: recipeDb.diets,
          steps: recipeDb.steps,
          createdInDb: recipeDb.createdInDb,
        };
        recipeIdDb
          ? res.status(200).send(recipeIdDb)
          : res.status(404).send("No existe el ID ingresado!!");
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
