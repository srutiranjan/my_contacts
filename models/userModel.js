const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please enter username"],
    },
    email:{
        type : String,
        require:[true,"Please enete the email"],
        unique:[true,"Email address already taken"],
    },
    password : {
        type:String,
        required: [true,"Please enter password"],
    }

},
{
    timestamps : true,
}
);
module.exports = mongoose.model('User',userSchema);