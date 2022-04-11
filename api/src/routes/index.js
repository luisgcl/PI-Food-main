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
            diets: el.diets,
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0]?.steps.map((el) => {
                return {
                  number: el.number,
                  step: el.step,
                };
              }),
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
   const infoDb = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
    const mapInfoDb = infoDb?.map((e) => {
      return {
        id: el.id,
            name: el.title,
            image: el.image,
            diets: el.diets?.map(d => d.name),
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0]?.steps.map((el) => {
                return {
                  number: el.number,
                  step: el.step,
                };
              }),
        createdInDb: e.createdInDb,
      };
    });
    return mapInfoDb;
}


const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(dbInfo);
    return infoTotal;
}

//rutas
router.get('/recipes', async (req, res) => {
    const name = req.query.name;
    let recipesTotal = await getAllRecipes();
    if(name) {
        recipeName = recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
        res.status(200).send(recipeName) :
        res.status(404).send('recipe no encontrado')
    }else {
        res.status(200).send(recipesTotal)
    }
})

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
      recipeCreated.addDiet(dietDb)
      res.send("receta creada con exito!")
    } catch(error){
      console.log(error)
    }
    
  })

module.exports = router;
