const fs = require('fs');
const path=require("path")
const {parse} = require("csv-parse");
const planets=require("./Planets.mongo")
const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === "CONFIRMED" 
        && planet['koi_insol'] > 0.32  
        && planet['koi_insol'] < 1.5  
        && planet['koi_prad'] < 2.0;
}

function loadPlanetsData(){
return new Promise ((resolve,reject)=>{
 fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',      // Treat lines starting with # as comments
    columns: true,     // Use first row as column names
    skip_empty_lines: true // Skip empty lines
  }))
  .on('data', async (data) => {
 if(isHabitablePlanet(data)){
  // TODO: Replace below create with insert +update=upsert
    // habitablePlanets.push(data);
 savePlanet(data)
 }
 
  })
  .on('error', (err) => {
    console.log(err);
    reject(err)
  })
  .on('end', async () => {
console.log(habitablePlanets.map((planet)=>{
  return planet["kepler_name"];
}))
const countPlanetsFound=(await getAllPlanets()).length;
console.log(`${countPlanetsFound} habitable planets found`)
    console.log("Done");
    resolve()
  });
  })
}
async function getAllPlanets(){
  return await planets.find({ },{
    '_id':0, 
    '__v':0
  });
}
async function savePlanet(planet){

  try {
    await  planets.updateOne({
    keplerName:planet.kepler_name
  },{
    keplerName:planet.kepler_name,
  },{
    upsert:true,
  })
  } catch (error) {
    console.error(`Could not save Planet ${error}`)
  }
   
}
  module.exports={
    loadPlanetsData,
    planets:habitablePlanets,
    getAllPlanets,
  }