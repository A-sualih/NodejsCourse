const {getAllPlanets}=require('../../models/planets-model')
async function httpGetAllPlanets(req,res){
return res.status(200).json( await getAllPlanets())
}
module.exports={
    httpGetAllPlanets,
}

// // The model module exports { loadPlanetsData, planets }
// const planetsModel = require('../../models/planets-model');

// function getAllPlanets(req, res) {
//     // Return the array of planets (guarding if the module shape changes)
//     const list = Array.isArray(planetsModel.planets) ? planetsModel.planets : [];
//     return res.status(200).json(list);
// }
// module.exports={
//     getAllPlanets,
// }