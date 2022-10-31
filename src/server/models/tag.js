import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
	Name: {
		type: String,
		unique: true
	},
	createdAt: {
        type: Date,
        default: new Date()
    },
});

class TagClass{
	static async createTags( tags ){
		const newTags = [];
		for (const tag of tags){
			const tagName = {Name: tag};
			const findedTags = await this.find( {Name: tag} );
			if (!findedTags.length) newTags.push(tagName);
		}
		if(newTags.length){
			const addedTags = await this.create( newTags );
			return addedTags;
		}
		else{
			return "No new tag"
		}
	}
	
	// static async deleteTag( tag ){
		
	// }
}

tagSchema.loadClass(TagClass);

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;