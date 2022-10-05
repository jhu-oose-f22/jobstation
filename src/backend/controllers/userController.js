const User = require('../models/User')
const Book = require('../models/Book')
const { book } = require('../router')
const ObjectID = require('mongodb').ObjectID

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        req.flash("errors", "you must be logged in to perform that action")
        req.session.save(function() {
            res.redirect('/')
        })
    }
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {avatar: user.avatar, username: user.data.username, _id: user.data._id}
        // res.send(result)
        req.session.save(function() { // callback function
            res.redirect('/')
        })
    }).catch(function(err) {
        // res.send(err)
        req.flash('errors', err)
        req.session.save(function() {
            res.redirect('/')
        })

    })
}

exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/')
    })
    // res.send("logged out")
    
}

exports.register = function(req, res) {
    // console.log(req.body)
    user = new User(req.body)
    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch((regErrors) => {
        // res.send(user.errors)
        regErrors.forEach(function(error) {
            req.flash('regErrors', error)
        })
        req.session.save(function() {
            res.redirect('/')
        })
    })
    
}


exports.home = function(req, res) {

    if (req.session.user) {
        // res.render('home-dashboard')
        // console.log(req.params.username)
        // console.log(req.session)

        Book.findAll(req.profileUser._id).then(function(books) {
            res.render('lib-dashboard', {
                books: books,
                profileUsername: req.profileUser.username,
                profileAvatar: req.profileUser.avatar
            })
            // res.render('home-dashboard')
        }).catch(function() {
            // console.log("posts not found")
            res.render('404')
        })

        // Book.findByOwnerId(req.profileUser._id).then(function(books) {
        //     res.render('lib-dashboard', {
        //         books: books,
        //         profileUsername: req.profileUser.username,
        //         profileAvatar: req.profileUser.avatar
        //     })
        //     // res.render('home-dashboard')
        // }).catch(function() {
        //     // console.log("posts not found")
        //     res.render('404')
        // })
        
    } else {
        res.render('home-guest', {regErrors: req.flash('regErrors')})
    }
}

exports.userHome = function(req, res, next) {
    if (req.session.user) {
        User.findByUsername(req.session.user.username).then(function(userDocument) {
            req.profileUser = userDocument
            // console.log("user found")
            next()
        }).catch(function() {
            // console.log("no such user")
            res.render("404")
        })
    }
    else {
        next()
    }
    
}

exports.ifUserExists = function(req, res, next) {
    // console.log(req.params.username)
    // console.log(req.session)
    User.findByUsername(req.params.username).then(function(userDocument) {
        req.profileUser = userDocument
        // console.log("user found")
        next()
    }).catch(function() {
        // console.log("no such user")
        res.render("404")
    })
}

exports.profileBooksScreen = function(req, res) {
    // ask our post model for posts by a certain user by id
    Book.findByOwnerId(req.profileUser._id).then(function(books) {
        // console.log("profile id: " + req.profileUser._id)
        console.log("profile books screen")
        console.log(books)
        res.render('profile', {
            books: books,
            profileUsername: req.profileUser.username,
            profileAvatar: req.profileUser.avatar
        })
    }).catch(function() {
        res.render('404')
    })
}
