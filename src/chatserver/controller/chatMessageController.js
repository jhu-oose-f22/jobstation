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

const storeChatMessage = async (room,content,user) => {
    try {
        const chat = await chatMessages.create({
            timestamp: format(new Date(), 'yyyyMMdd\tHH:mm:ss'),
            groupname: room,
            user: user,
            content:content
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createChatMessage,
    storeChatMessage
}