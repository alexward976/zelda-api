const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  mongodb
    .getDb()
    .db("zelda-api")
    .collection("equipment")
    .find()
    .toArray((err, lists) => {
      if(err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.staus(200).json(lists);
    })
};

const getSingle = async (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid item id to find an item.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("zelda-api")
    .collection("equipment")
    .find({ _id: userId })
    .toArray((err, result) => {
      if(err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.staus(200).json(result[0]);
    })
};

const createEquipment = async (req, res, next) => {
    try {
      const _db = mongodb.getDb().db("zelda-api");
      const equipment = _db.collection("equipment");
      const newEquipment = req.body;
  
      const result = await equipment.insertOne(newEquipment);

      if (result.acknowledged) {
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.status(201).json(newEquipment._id);
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the item');
      }
      
      
    } finally {
      await mongodb.close;
    }
};

const updateEquipment = async (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid item id to find an item.');
  }
  const userId = new ObjectId(req.params.id);

  const item = {
    name: req.body.name,
    games: req.body.games,
    locations: req.body.locations
  }

  const response = await mongodb.getDb().db("zelda-api").collection("equipment").replaceOne({ _id: userId }, item);
  console.log(response);

  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item');
  }

}

const deleteEquipment = async (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid item id to find an item.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("zelda-api").collection("equipment").deleteOne({ _id: userId }, true);
  console.log(response);
  if(response.deletedCount > 0) {
    res.status(205).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item');
  }
}

module.exports = { getAll, getSingle, createEquipment, updateEquipment, deleteEquipment };