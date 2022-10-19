const mongoose = require('mongoose');
const chatMessages = require('../model/ChatMessage');
const { format } = require('date-fns');
// I am trying to create a collection like "oose_jobstation_chatmessage", but IDK how to do that.



const createChatMessage = (groupname, owner) => {
    // const GroupChatMessages = mongoose.model(`${groupname}chatmessages`,chatMessageSchema);
    // try {
    //     const res = await GroupChatMessages.create()
    // } catch (error) {
        
    // } 


}

const fetchChatMessage = async (room) => {
    try {
        const history = await chatMessages.find({groupname: room});
        console.log("fecthed")
        return history;

        // const msgs = history.map((obj) => {user: obj.user, content: obj.content});
        // console.log(`inserted ${content}`)
    } catch (error) {
        console.log("fetch failed")
        console.error(error);
    } 
}

const storeChatMessage = async (room,content,user) => {
    try {
        const chat = await chatMessages.create({
            timestamp: format(new Date(), 'yyyyMMdd\tHH:mm:ss'),
            groupname: room,
            user: user,
            content:content
        });
        console.log(`inserted ${content}`)
    } catch (error) {
        console.log("insert failed")
        console.error(error);
    } 
}

module.exports = {
    createChatMessage,
    storeChatMessage,
    fetchChatMessage
}