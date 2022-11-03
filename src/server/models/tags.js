import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: { 
      type: String, 
      required:  true 
    },
    id: { 
      type: String 
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
  });
  
  export default mongoose.model("Tag", tagSchema);