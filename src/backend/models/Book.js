const booksCollection = require('../db').db().collection("books")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')
const { book } = require('../router')
booksCollection.createIndex({title: "text", author: "text", body: "text"})

let Book = function(data, userid, requestedBookId) {
    this.data = data
    this.errors = []
    this.userid = userid
    this.requestedBookId = requestedBookId
}
Book.prototype.cleanUp = function() {
    if (typeof(this.data.title) != "string") {
        this.data.title = ""
    }
    if (typeof(this.data.author) != "string") { 
        this.data.body = ""
    }
    if (typeof(this.data.body) != "string") {
        this.data.body = ""
    }

    // get rid of any abnormal properties
    this.data = {
        title: this.data.title.trim(),
        author: this.data.author.trim(), 
        body: this.data.body.trim(), 
        addedDate: new Date(), 
        owner: ObjectID(this.userid)
    }
}

Book.prototype.validate = function() {
    if (this.data.title == "") {this.errors.push("title is required")}
    if (this.data.body == "") {this.errors.push("body is required")}
}
 
Book.prototype.create = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            // save book to database
            booksCollection.insertOne(this.data).then((info) => {
                resolve(info.insertedId)
            }).catch(() => {
                this.errors.push('unknown err')
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}

Book.prototype.update = function() {
    return new Promise(async (resolve, reject) => {
      try {
        let book = await Book.findSingleById(this.requestedBookId, this.userid)
        if (book.isVisitorOwner) {
          // actually update the db
          let status = await this.actuallyUpdate()
          resolve(status)
        } else {
          reject()
        }
      } catch {
        reject()
      }
    })
  }

  Book.prototype.actuallyUpdate = function() {
    return new Promise(async (resolve, reject) => {
      this.cleanUp()
      this.validate()
      if (!this.errors.length) { 
        await booksCollection.findOneAndUpdate({_id: new ObjectID(this.requestedBookId)}, {$set: {title: this.data.title, author: this.data.author, body: this.data.body}})
        resolve("success")
      } else {
        resolve("failure")
      }
    })
  }

Book.reusableBookQuery = function(uniqueOperations, visitorId, finalOperations = []) {
    return new Promise(async function(resolve, reject) {
        let aggOperations = uniqueOperations.concat([ 
            {$lookup: {from: "users", localField: "owner", foreignField: "_id", as: "ownerDocument"}},
            {$project: {
                title: 1,
                author: 1,
                body: 1,
                addedDate: 1,
                ownerId: "$owner",
                owner: {$arrayElemAt: ["$ownerDocument", 0]}
            }}
        ]).concat(finalOperations)
        console.log("reusable begins")
        let books = await booksCollection.aggregate(aggOperations).toArray()
        console.log("resuable ends")
        books = books.map(function(book) {
            book.isVisitorOwner = book.ownerId.equals(visitorId)
            book.ownerId = undefined  
            book.owner = {
                username: book.owner.username,
                avatar: new User(book.owner, true).avatar
            }
            return book
        })
        // console.log("reusable query resolve")
        resolve(books)
    })
}

Book.findSingleById = function(id, visitorId) {
    return new Promise(async function(resolve, reject) {
        if (typeof(id) != "string" || !ObjectID.isValid(id)) {
            reject()
            return
        }
        let books = await Book.reusableBookQuery([
            {$match: {_id: new ObjectID(id)}}
        ], visitorId)
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
        if (books.length) {
            resolve(books[0])
        } else {
            reject()
        }
    })
}

Book.findByOwnerId = function(ownerId) {

    return Book.reusableBookQuery([
        {$match: {owner: ownerId}}, 
        {$sort: {addedDate: -1}}
    ])

}

Book.delete = function(bookIdToDelete, currentUserId) {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await Book.findSingleById(bookIdToDelete, currentUserId)
            if (book.isVisitorOwner) {
                await booksCollection.deleteOne({_id: new ObjectID(bookIdToDelete)})
                resolve()
            } else {
                reject()
            }
        } catch {
            reject()
        }
    }) 
}
 
Book.search = function(searchTerm) {
    return new Promise(async (resolve, reject) => {
      if (typeof(searchTerm) == "string") {
        let books = await Book.reusableBookQuery([
          {$match: {$text: {$search: searchTerm}}}
        ], undefined, [{$sort: {score: {$meta: "textScore"}}}])
        resolve(books)
      } else { 
        reject()
      }
    })
  }


module.exports = Book