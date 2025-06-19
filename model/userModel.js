const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:Number},
    password:{type:String}
},
{timestamps:true,
    versionKey:false
}
)

// const User = mongoose.model("user",userSchema)
// module.exports = User

module.exports = mongoose.model("user", userSchema);

