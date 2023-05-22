const express = require('express');
const router = express.Router();
const auth = require('./../middleware//auth');
const categorycontroller = require('./../controllers/categorycontroller');
router.post('/add-category',auth,categorycontroller.addcategory);
module.exports = router;