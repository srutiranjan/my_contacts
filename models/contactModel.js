const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.ObjectId,
        required :true,
        ref:"User",
    },
    username:{
        type:String,
        required:[true,"Please add the username"],
    },
    email:{
        type:String,
        required:[true,"Please add the email"],
    },
    phone:{
        type:String,
        required:[true,"Please add the phone"],
    },
    password:{
        type:String,
        required:[true,"Please add the password"],
    },
},{
    timestamps : true
}
);

module.exports = mongoose.model("Contacts",contactSchema);

