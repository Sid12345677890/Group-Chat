import mongoose from "mongoose";

const chatSchema =mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
     type:String,
     required:true
    },
    msg:{
        type:String,
        maxLength:60
    },
    created_at:{
        type:Date,
        required:true
    }
})

const chat=mongoose.model("chat",chatSchema);
export default chat;