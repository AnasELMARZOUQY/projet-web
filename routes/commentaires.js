var express = require('express');
var router = express.Router();
const commentaireController = require('../controllers/commentaireController')



router.get('/:articleId/comments', commentaireController.getAllComments);

router.post('/:articleId/comments', commentaireController.addComment)
router.delete('/:articleId/comments/:id' , commentaireController.deleteComment)
router.patch('/:articleId/comments/:id' , commentaireController.updateComment)


module.exports = router