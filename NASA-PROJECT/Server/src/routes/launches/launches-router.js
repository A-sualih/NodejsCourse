const express=require('express');
const {httpgetAllLauches} = require('./launches-controller');
const {httpAddNewLaunch} = require('./launches-controller');
const { httpAbortLaunch } = require('./launches-controller');

const lauchesRouter=express.Router();
lauchesRouter.get("/",httpgetAllLauches);
lauchesRouter.post("/",httpAddNewLaunch);
lauchesRouter.delete("/:id",httpAbortLaunch);
module.exports=lauchesRouter;