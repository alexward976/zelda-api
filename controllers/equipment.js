const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("zelda-api")
    .collection("equipment")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("zelda-api")
    .collection("equipment")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.json(lists[0]);
  });
};

const createEquipment = async (req, res, next) => {
    try {
      const _db = mongodb.getDb().db("zelda-api");
      const equipment = _db.collection("equipment");
      const newEquipment = req.body;
  
      const result = await equipment.insertOne(newEquipment);
  
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.status(201).json(newEquipment._id);
    } finally {
      await mongodb.close;
    }
};

module.exports = { getAll, getSingle, createEquipment };