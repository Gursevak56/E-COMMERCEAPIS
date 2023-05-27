const express = require('express');
const route = express.Router();
const subcategorycontroller = require('./../controllers/subcategorycontroller');
route.post('/add-subcategory',subcategorycontroller.addsubcategory);
module.exports = route;