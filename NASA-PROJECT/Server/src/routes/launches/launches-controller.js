// const { lauches } = require("../../models/Launches-model");
const { getAllLauches, abortLaunchById } = require("../../models/Launches-model");
const { addNewLaucnh } = require("../../models/Launches-model");
const {existsLaunchWithId} =require("../../models/Launches-model")

function httpgetAllLauches(req,res){
//    return res.status(200).json(Array.from(lauches.values()));
   return res.status(200).json(getAllLauches());
}
function httpAddNewLaunch(req,res){
  const launch=req.body;
  if(!launch.mission|| !launch.rocket || !launch.launchDate || !launch.target){
    return res.status(400).json({
    error:"missing required launch property"
    })
  }
  // launch.lauchDate=new Date(launch.lauchDate);
//  if(isNaN(launch.lauchDate)){
//   return res.status(400).json({
//     error:"invalid launch date",
//   })
//  }
  addNewLaucnh(launch)
    return res.status(201).json(launch)
}
function httpAbortLaunch(req,res){
const launchId=Number(req.params.id);
if(!existsLaunchWithId(launchId)){
return res.status(404).json({
  error:"Launch not found",
})
}
const aborted=abortLaunchById(launchId)
return res.status(200).json(aborted)
}
module.exports={
  httpgetAllLauches,
  httpAddNewLaunch,
  httpAbortLaunch
}