const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    timestamp:{
        type: String,
        require: true
    },
    groupname:{
        type: String,
        require: true
    },
    user:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model('chatmessages',chatMessageSchema);

