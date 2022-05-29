var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController')


router.get('/', articleController.getAllArticles);
router.get('/:id' , articleController.getArticleById);
router.post('/', articleController.addArticle)
router.delete('/:id' , articleController.deleteArticleById)
router.patch('/:id' , articleController.updateArticle)


module.exports = router