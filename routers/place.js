const express = require('express');
const router = express.Router();
const {getStore, addStore} = require('../controllers/plaseController')

router.route('/').get(getStore)

module.exports = router