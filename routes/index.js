const express = require('express');
const router = express.Router();


router.use('/equipment', require('./equipment'));

module.exports = router;