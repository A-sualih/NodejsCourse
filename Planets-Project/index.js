const {parse} = require("csv-parse");
const fs = require('fs');
const planets = require("../NASA-PROJECT/Server/src/models/planets-model");

const habitablePlanets = [];
// More lenient criteria
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === "CONFIRMED" 
        && planet['koi_insol'] > 0.32  
        && planet['koi_insol'] < 1.5  
        && planet['koi_prad'] < 2.0;
}
fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',      // Treat lines starting with # as comments
    columns: true,     // Use first row as column names
    skip_empty_lines: true // Skip empty lines
  }))
  .on('data', (data) => {
 if(isHabitablePlanet(data)){
    habitablePlanets.push(data);
 }
 
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
console.log(habitablePlanets.map((planet)=>{
  return planet["kepler_name"];
}))
console.log(`${habitablePlanets.length} habitable planets found`)
    console.log("Done");
  });
  module.exports={
    planets:habitablePlanets
  }