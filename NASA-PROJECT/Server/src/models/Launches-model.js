const lauches=new Map();
const launch={
    flightNumber:100,
    mission:"kepler Exploration X",
    rocket:"Explorer ISI",
    lauchDate:new Date("December 27,2030"),
    destination:"Kepler-442 b",
    customer:["ZTM","NASA"],
    upcoming:true,
    success:true,
}
lauches.set(launch.flightNumber,launch);
function getAllLauches(){
    return Array.from(lauches.values())
}
module.exports={
   getAllLauches
}