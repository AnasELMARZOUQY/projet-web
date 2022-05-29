var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController')



router.get('/', categoryController.getAllCategories);
router.get('/:id' , categoryController.getCategoryById);
router.post('/', categoryController.addCategory)
router.delete('/:id' , categoryController.deleteCategoryById)
router.patch('/:id' , categoryController.updateCategory)

module.exports = router;