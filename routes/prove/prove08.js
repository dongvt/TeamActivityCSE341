
const express = require('express');
const router = express.Router();

const books = Array();

const controller = require('../../controllers/prove08controller');

router.get('/', controller.getJSONdata);

module.exports = router;