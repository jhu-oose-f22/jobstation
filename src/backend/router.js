const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')

router.get('/', userController.userHome, userController.home)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// profile related routes
// userController.ifUserExists determines whether the next function
// (i.e., userController.profilePostsScreen) get to be run
// if the current user doesn't exist, it renders 404 and stops here
router.get('/profile/:username', userController.ifUserExists, userController.profileBooksScreen)

// book related routes
router.get('/add-book', userController.mustBeLoggedIn, bookController.viewCreateScreen)
router.post('/add-book', userController.mustBeLoggedIn, bookController.create)
router.get('/book/:id', userController.mustBeLoggedIn, bookController.viewSingle)
router.get('/book/:id/edit', userController.mustBeLoggedIn, bookController.viewEditScreen)
router.post('/book/:id/edit', userController.mustBeLoggedIn, bookController.edit)
router.post('/book/:id/delete', userController.mustBeLoggedIn, bookController.delete)
router.get('/search', userController.mustBeLoggedIn, bookController.viewSearchScreen)
router.post('/search', userController.mustBeLoggedIn, bookController.search)

module.exports = router

