import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    groupName: String,
    groupIntro: String,
    owner: String, //should be user
    members: {
        type: [String],
        default: []
    },
    tags: [String],
    avatar: String,
    memberCount: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
}, ['']);

class GroupClass{
    static async createGroup({groupName, groupIntro, groupTag, owner,  avatar = ''}){
        // if (groupName && owner && tags){
        if (groupName){
        console.log(`creating new group: ${owner}`);

            // const memberCount = member.lenth;
            const newGroup = await this.create({
                groupName,
                groupIntro,
                tags: groupTag,
                owner,
                members: [owner]
                // tags,
                // avatar,
                // memberCount,
            });
            return newGroup;
        }
        else{
            throw new Error('Missing component of a group.');
        }
    }
}

groupSchema.loadClass(GroupClass);

const Group = mongoose.model('Group', groupSchema);

export default Group;