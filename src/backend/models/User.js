const bcrypt = require('bcryptjs')
const { promiseImpl } = require('ejs')
const usersCollection = require('../db').db().collection("users")
const validator = require('validator')
const md5 = require('md5')

let User = function(data, getAvatar) { // construction function

    this.data = data
    this.errors = []

    if (getAvatar == undefined) {getAvatar = false}
    if (getAvatar) {this.getAvatar()}
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("not a valid email")
        }
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("not a valid username")
        }
        if (this.data.username == "") {
            this.errors.push("empty username. ")
        }
        if (this.data.password == "") {this.errors.push("empty password")}
        if (this.data.password.length > 50) {this.errors.push("maximal length of password is 50")}
        // check if username is taken
        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if (usernameExists) {this.errors.push("username is already taken")}
        }
        // check email
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if (emailExists) {this.errors.push("email is already taken")}
        }
        resolve()
    })
}

User.prototype.cleanUp = function () {
    if (typeof this.data.username != "string") {
        this.data.username = ""
    }
    if (typeof this.data.email != "string") {
        this.data.email = ""
    }
    if (typeof this.data.password != "string") {
        this.data.password = ""
    }

    // get rid of any abnormal properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
         
            // 1. validate username/mail/passowrd
            this.cleanUp()
            await this.validate()
            // 2. save the user data into a database if no validation errors
            if (!this.errors.length) {
                // hash user password
                let salt = bcrypt.genSaltSync(10)
                this.data.password = bcrypt.hashSync(this.data.password, salt)
                await usersCollection.insertOne(this.data)
                this.getAvatar()
                resolve()
            }
            else {
                reject(this.errors)
            }
        
    })
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                // console.log("logged in")
                this.data = attemptedUser
                this.getAvatar()
                resolve("logged in")

            } else {
                // console.log("invalid username or password")
                reject("invalid")
            }
        }).catch(function() {
            reject("unknown err")
        })
    })
    
}

User.prototype.getAvatar = function() {
    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}

User.findByUsername = function(username) {
    return new Promise(function(resolve, reject) {
        if (typeof(username) != "string") {
            reject()
            return
        }
        usersCollection.findOne({username: username}).then(function(userDoc) {
            if (userDoc) {
                userDoc = new User(userDoc, true)
                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avatar: userDoc.avatar
                }
                // console.log("userdoc: ")
                // console.log(userDoc)
                resolve(userDoc)
            } else {
                reject()
            }
        }).catch(function() {
            reject()
        })
    })
}

module.exports = User