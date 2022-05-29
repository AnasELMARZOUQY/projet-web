var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')




router.get('/', userController.getAllUsers);
router.get('/:id' , userController.getUserById);
router.post('/', userController.addUser)
router.delete('/:id' , userController.deleteUserById)
router.patch('/:id' ,userController.updateUser)

module.exports = router;
