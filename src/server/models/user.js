import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required:  true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  avatar: String,
  groups: [String],
  tags: [String],
  posts:[String],
  id: { 
    type: String 
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

export default mongoose.model("User", userSchema);
// import bcrypt from 'bcryptjs';

// import validator from 'validator';


// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({

//     data: {
//         username: {
//             type: String,
//             required: true
//         },
//         email: {
//             type: String,
//             required: true
//         },
//         password: {
//             type:String,
//             required: true
//         }
//     },
//     errors: [String]

// });

// class UserClass {

//     cleanUp(){
//         if (typeof this.data.username != "string") {
//             this.data.username = ""
//         }
//         if (typeof this.data.email != "string") {
//             this.data.email = ""
//         }
//         if (typeof this.data.password != "string") {
//             this.data.password = ""
//         }
    
//         // get rid of any abnormal properties
//         this.data = {
//             username: this.data.username.trim().toLowerCase(),
//             email: this.data.email.trim().toLowerCase(),
//             password: this.data.password
//         }
//     }

//     async validate() {
//         return new Promise(async (resolve, reject) => {
//             if (!validator.isEmail(this.data.email)) {
//                 this.errors.push("not a valid email")
//             }
//             if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
//                 this.errors.push("not a valid username")
//             }
//             if (this.data.username == "") {
//                 this.errors.push("empty username. ")
//             }
//             if (this.data.password == "") {this.errors.push("empty password")}
//             if (this.data.password.length > 50) {this.errors.push("maximal length of password is 50")}
//             // check if username is taken
//             if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
//                 let usernameExists = await usersCollection.findOne({username: this.data.username})
//                 if (usernameExists) {this.errors.push("username is already taken")}
//             }
//             // check email
//             if (validator.isEmail(this.data.email)) {
//                 let emailExists = await usersCollection.findOne({email: this.data.email})
//                 if (emailExists) {this.errors.push("email is already taken")}
//             }
//             resolve()
//         })
//     }

//     async login(req, res) {
//         let user = new User(req.body)
//         user.login().then(function(result) {
//             req.session.user = {avatar: user.avatar, username: user.data.username, _id: user.data._id}
//             // res.send(result)
//             req.session.save(function() { // callback function
//                 res.redirect('/')
//             })
//         }).catch(function(err) {
//             // res.send(err)
//             req.flash('errors', err)
//             req.session.save(function() {
//                 res.redirect('/')
//             })
    
//         })
    
//     }
//     async register({ } = {}) {
//         return new Promise(async (resolve, reject) => {

//             // 1. validate username/mail/passowrd
//             this.cleanUp()
//             await this.validate()
//             // 2. save the user data into a database if no validation errors
//             if (!this.errors.length) {
//                 // hash user password
//                 let salt = bcrypt.genSaltSync(10)
//                 this.data.password = bcrypt.hashSync(this.data.password, salt)
//                 await usersCollection.insertOne(this.data)
//                 this.getAvatar()
//                 resolve()
//             }
//             else {
//                 reject(this.errors)
//             }

//         })
//     }

// }

// userSchema.loadClass(UserClass);

// const User = mongoose.model('User', userSchema);

// export default User;