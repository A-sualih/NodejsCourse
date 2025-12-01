// const { lauches } = require("../../models/Launches-model");
const { getAllLauches } = require("../../models/Launches-model");

function httpgetAllLauches(req,res){
//    return res.status(200).json(Array.from(lauches.values()));
   return res.status(200).json(getAllLauches());
}
module.exports={
  httpgetAllLauches
}