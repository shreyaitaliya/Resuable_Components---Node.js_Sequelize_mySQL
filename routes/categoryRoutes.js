const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verificationToken = require('../middelware/tokenAuthenticate');
const validate = require('../middelware/validate');
const { categorySchema, updateCategorySchema } = require('../middelware/Schemas/categorySchema');

//Add Routes
router.post('/category', validate(categorySchema), verificationToken, categoryController.addCategory);

//Get Routes
router.get('/getcategory', verificationToken, categoryController.getCategory);

//Get By Id Routes
router.get('/category/:id', verificationToken, categoryController.GetByIdCategory);


//Update Category
router.put('/updatecategory/:id', validate(updateCategorySchema), verificationToken, categoryController.UpdateCategory);

//Delete Category
router.delete('/deletecategory/:id', verificationToken, categoryController.DeleteCategory);

module.exports = router;