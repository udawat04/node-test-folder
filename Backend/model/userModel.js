const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    role: {
      type: String,
      enum: ["user", "admin" , "client"], 
      default: "user",
    },
    password: { type: String },
  },
  { timestamps: true, versionKey: false }
);



module.exports = mongoose.model("user", userSchema);

