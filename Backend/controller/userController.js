const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretkey = "hdfdjkdj"

exports.createUser =  async(req,res)=>{

    try {
        const {name,email,phone,password,role} = req.body

        const alreadyEmail = await User.findOne({email})
        if(alreadyEmail){
            return res.status(400).send("user already created")
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const data = {name,email,phone,password:hash,role}
        console.log(data);

        const newUser = new User(data);
        await newUser.save();

        return res
          .status(200)
          .json({ message: "User Created Successfully", data });
    } catch (error) {
        return res
          .status(400)
          .json({ message:error.message });
    }

}
exports.getall = async(req,res)=>{
    console.log(req.user,"sdfggh");
    const result = await User.find()
    return res.status(200).send(result)
}



exports.login = async(req,res)=>{
    const {email,password} = req.body

    const alreadyEmail = await User.findOne({email})

    if(!alreadyEmail){
        return res.status(400).json({message:"User is not created , please signup "})
    }
    const dbpassword = alreadyEmail.password

    const match = await bcrypt.compare(password,dbpassword)

    if(!match){
        return res.status(400).send("incorrect password / password not match")
    }

    const token = jwt.sign({email:alreadyEmail.email},secretkey,{expiresIn:"1h"})

    return res
      .status(200)
      .json({ message: "User login Sucessfully",token,alreadyEmail });

}

exports.reset = async(req,res)=>{
    const {email,oldPassword,newPassword} = req.body

    const alreadyEmail = await User.findOne({email})
    console.log(alreadyEmail);

    if(!alreadyEmail){
        return res
          .status(400)
          .json({ message: "User is not created , please signup " });    
    }

    const dbpassword = alreadyEmail.password
    const id = alreadyEmail._id

    const data = {password:newPassword}

    if(oldPassword===dbpassword){
        const result = await User.findOneAndUpdate(id, data, { new: true });
        return res.status(200).send(result)
    }
    else{
        return res.status(200).json({message:"password not match"})
    }
}

exports.forget = async(req,res)=>{
    const { email , newPassword } = req.body;

    const alreadyEmail = await User.findOne({ email });
    console.log(alreadyEmail);

    if (!alreadyEmail) {
      return res
        .status(400)
        .json({ message: "User is not created , please signup " });
    }

    const id = alreadyEmail.id;

    const data = { password: newPassword };
    const result = await User.findOneAndUpdate(id, data, { new: true });
    return res.status(200).send(result);
}
