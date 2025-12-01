const express=require('express');
const {httpgetAllLauches} = require('./launches-controller');
const lauchesRouter=express.Router();
lauchesRouter.get("/lauches",httpgetAllLauches);
module.exports=lauchesRouter;