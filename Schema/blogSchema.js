import mongoose, {Schema} from 'mongoose';

const blogSchema = new Schema ({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        

    }, description:{
        type: String,
        required: true,
        unique: true,
        trim: true,
     

    },
      image: {
      type: String, // ✅ base64 OR image URL
      default: null,
    },

},{timestamps : true})

mongoose.models ={}


const BlogSchema = mongoose.model("Blog", blogSchema)
export default BlogSchema;