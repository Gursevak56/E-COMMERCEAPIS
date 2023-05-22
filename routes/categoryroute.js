const express = require('express');
const router = express.Router();
const auth = require('./../middleware//auth');
const duplicate = require('./../middleware//duplicatecategory');
const categorycontroller = require('./../controllers/categorycontroller');
router.post('/add-category',auth,categorycontroller.addcategory);
module.exports = router;