const express=require('express');
const {httpgetAllLauches} = require('./launches-controller');
const {httpAddNewLaunch} = require('./launches-controller');
const lauchesRouter=express.Router();
lauchesRouter.get("/",httpgetAllLauches);
lauchesRouter.post("/",httpAddNewLaunch);
module.exports=lauchesRouter;