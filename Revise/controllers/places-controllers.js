const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Memluky As suadiy Arabiya",
    description: "one of the most favorite and beautiful country in The world",
    location: {
      lat: 45.938,
      lng: -34.483,
    },
    address: "20 w 21 st, Medina jida",
    creator: "AB",
  },
];
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id,");
    //  const error=new Error ("Could not find a place for the provided id,")
    //  error.code=404;
    //  throw error
  }
  res.json({ place });
};
// this....................................................
const getPlacesByUserId = (req, res, next) => {
  const uesrId = req.params.uid.trim();
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === uesrId;
  });
  console.log(req.params);
  if (!places || places.length === 0) {
    //  const error=new Error ("Could not find a place for the provided user id,")
    //  error.code=404;
    return next(
      new HttpError("Could not find a place for the provided user id,", 404)
    );
  }
  res.json({ places });
};
const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Inalid inputs passed , please check your data", 422);
  }
  const { title, description, location, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title, // FIXED
    description,
    location,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace }); // FIXED
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Inalid inputs passed , please check your data", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;
  res.status(200).json({ place: updatePlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if(!DUMMY_PLACES.find(p=>p.id===placeId)){
    throw new HttpError("Could not find a place for that id",404)
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ meesage: "Deleted Place" });
};
(exports.updatePlace = updatePlace),
  (exports.deletePlace = deletePlace),
  (exports.getPlaceById = getPlaceById);
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
