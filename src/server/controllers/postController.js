const { findConfigUpwards } = require('@babel/core/lib/config/files')
const Post = require('../models/Post')
const { book } = require('../router')
exports.viewCreateScreen = function(req, res) {
    res.render('add-book')
}
     
exports.viewSearchScreen = function(req, res) { 
    res.render('search-book')
    // console.log(req.body)  
} 
      
exports.create = function(req, res) {
    // console.log(req.body)
    let book = new Post(req.body, req.session.user._id)
    book.create().then(function(newId) { 
        // the return value of book.create() is what it resolve(), 
        // and the return value can be used directly as
        // the argument of the then() function(e.g., newId, here)
        // res.send("new book created")
        req.flash("success", "new post created")
        req.session.save(() => res.redirect(`/book/${newId}`))
    }).catch(function(errors) {
        // res.send(errors)
        errors.forEach(error => req.flash("errors", error))
        req.session.save(() => res.redirect("/add-book"))
    })
}

exports.viewSingle = async function(req, res) {
    try {
        let book = await Post.findSingleById(req.params.id, req.visitorId)
        res.render('single-book-screen', {book: book})
    } catch {
        // res.send("404 not found")
        res.render('404')
    }
}

exports.viewEditScreen = async function(req, res) {
    try {
        let book = await Post.findSingleById(req.params.id, req.visitorId)
        // { sample of returned book
        //     _id: new ObjectId("6317fced299500f0846bcf28"),
        //     title: 'another book',
        //     body: 'asdfasfd asdf asf \r\nasdfasf\r\nsadfzcvvvvzcvzcvzxv\\\r\n324234234',
        //     createdDate: 2022-09-07T02:07:41.661Z,
        //     authorId: undefined,
        //     author: {
        //       username: 'user7',
        //       avatar: 'https://gravatar.com/avatar/9a1c72396097ca4a7985f4dbf56b79ed?s=128'
        //     },
        //     isVisitorOwner: true
        //   }
        if (book.isVisitorOwner) {
            res.render("edit-book", {book: book})
        } else {
            req.flash("errors", "you have no permission to the requested page")
            req.session.save(() => res.redirect("/"))
        }
    } catch {
        res.render('404')
    }
}

exports.edit = function(req, res) {
    let book = new Post(req.body, req.visitorId, req.params.id)
    book.update().then((status) => {
        // the book was updated in the database
        // or user did have permission, but there were validation errors
        if (status == "success") {
            // book was updated
            req.flash("success", "updated.")
            req.session.save(function() {
                res.redirect(`/book/${req.params.id}/edit`)
            })
        } else {
            // 
            book.errors.forEach(function(error) {
                req.flash("errors", error)
            })
            req.session.save(function() {
                res.redirect(`/book/${req.params.id}/edit`)
            })
        }
    }).catch(() => {
        // a book with the requested id doesn't exist
        // or the current visitor is not the owner of the book
        req.flash("errors", "you have no permission to modify it")
        req.session.save(function() {
            res.redirect("/")
        })
    })
}

exports.search = function(req, res) {
    // console.log(" search by title: " + req.body.title)
    Post.search(req.body.related).then(books => {
        console.log(req.body)
        // res.render('search-result')
        // console.log(books)
        res.render('search-result', {
            books: books,
            profileUsername: req.session.user.username,
            profileAvatar: req.session.user.avatar
        })
    }).catch(() => {
        res.render('404')
    })
}

exports.delete = function(req, res) {
    Post.delete(req.params.id, req.visitorId).then(() => {
        req.flash("success", "successfully deleted")
        req.session.save(() => {res.redirect(`/profile/${req.session.user.username}`)})
    }).catch(() => {
        req.flash("errors", "you have no permission to delete it")
        req.session.save(() => res.redirect("/"))
    })
}

