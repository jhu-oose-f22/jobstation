import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    groupName: String,
    owner: String, //should be user
    member: {
        type: [String],
        default: []
    },
    tags: [String],
    intro: String,
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
    static async createGroup({groupName, owner, member, tags, intro, avatar}){
        if (groupName && owner && tags){
            // const memberCount = member.lenth;
            const newGroup = await this.create({
                groupName,
                owner,
                member,
                tags,
                intro,
                avatar,
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