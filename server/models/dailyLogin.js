import mongoose from "mongoose";


const dailyLoginSchema = new mongoose.Schema({
    date:{
        type:String,
        default: new Date().toLocaleDateString()
    },
    val:{
        type:String,
        required:true,
        default:""
    },
});

const dailyLogin = mongoose.model("dailyLogin",dailyLoginSchema);
export default dailyLogin;