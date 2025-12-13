const express=require("express")
const planetsRouter=require("./planets/planets-router")
const lauchesRouter = require("./launches/launches-router");
const api=express.Router()
api.use('/planets',planetsRouter);
api.use('/lauches',lauchesRouter);
module.exports=api;