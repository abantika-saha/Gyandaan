import mongoose from "mongoose";

const blogsSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  year: {
    type: Number,
    required: true,
  },
  subject: { type: String, required: true },
  creator: { name:{type: String, required: true},id:{type: String,required:true} },
  upvotes: {
    type: Number,
    default: 0,
    required: true,
  },
  upvoteList:{
    type:[String],
    required:true,
    default:[],
  }
});

const blog = mongoose.model("blog", blogsSchema);
export default blog;
