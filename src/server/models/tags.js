import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: { 
        type: String, 
        required:  true 
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
  });
  
export default mongoose.model("Tag", tagSchema);