const express=require("express");
const placesControllers=require("../controllers/places-controllers");
const router=express.Router();
router.get('/user/:uid',placesControllers.getPlacesByUserId)
router.get("/:pid",placesControllers.getPlaceById)
router.post('/',placesControllers.createPlace);
router.patch("/:pid",placesControllers.updatePlace)
router.delete("/:pid",placesControllers.deletePlace)
// if the creator property in aplace holds the user id thats part of the url it's pthe place which i
module.exports=router;