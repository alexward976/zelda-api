const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const equipmentController = require('../controllers/equipment');

router.get('/', equipmentController.getAll);
router.get('/:id', equipmentController.getSingle);

router.post('/', validation.saveEquipment, equipmentController.createEquipment);

router.put('/:id', validation.saveEquipment, equipmentController.updateEquipment);

router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;