// const { lauches } = require("../../models/Launches-model");
const { getAllLauches, abortLaunchById } = require("../../models/Launches-model");
const { scheduleNewLaunch } = require("../../models/Launches-model");
const {existsLaunchWithId} =require("../../models/Launches-model")

async function httpgetAllLauches(req,res){
//    return res.status(200).json(Array.from(lauches.values()));
   return res.status(200).json(await getAllLauches());
}
async function httpAddNewLaunch(req,res){
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
  await scheduleNewLaunch(launch)
  console.log(launch)
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res){
const launchId=Number(req.params.id);
const existsLaunch=await existsLaunchWithId(launchId)
if(!existsLaunch){
return res.status(404).json({
  error:"Launch not found",
})
}
const aborted=await abortLaunchById(launchId)
if(!aborted){
  return res.status(400).json({
    error:"Launch not aborted"
  })
}
return res.status(200).json({aborted})
}
module.exports={
  httpgetAllLauches,
  httpAddNewLaunch,
  httpAbortLaunch
}