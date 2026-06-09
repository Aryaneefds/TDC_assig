import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
{
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },

    matchedClientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },

    score:Number,

    reason:String,

    status:{
        type:String,
        enum:[
            "Suggested",
            "Sent",
            "Accepted",
            "Rejected"
        ],
        default:"Sent"
    }
},
{
    timestamps:true
});

export default mongoose.model(
    "Match",
    matchSchema
);