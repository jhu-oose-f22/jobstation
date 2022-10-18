const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const groupController = require('./controllers/groupController');

router.get('/', userController.userHome, userController.home)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get('/profile/:username', userController.ifUserExists, userController.profileBooksScreen)

// forums related routes
router.get('/add-book', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/add-book', userController.mustBeLoggedIn, postController.create)
router.get('/book/:id', userController.mustBeLoggedIn, postController.viewSingle)
router.get('/book/:id/edit', userController.mustBeLoggedIn, postController.viewEditScreen)
router.post('/book/:id/edit', userController.mustBeLoggedIn, postController.edit)
router.post('/book/:id/delete', userController.mustBeLoggedIn, postController.delete)
router.get('/search', userController.mustBeLoggedIn, postController.viewSearchScreen)
router.post('/search', userController.mustBeLoggedIn, postController.search)

// group related routes
router.get('/group/:group-name:username',userController.mustBeLoggedIn,groupController.joinGroup)
router.post('/create-group',userController.mustBeLoggedIn,groupController.create)
router.post('group/:id/edit',userController.mustBeLoggedIn,groupController.edit)



module.exports = router

