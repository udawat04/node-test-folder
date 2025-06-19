const User = require("../model/userModel")

exports.createUser =  async(req,res)=>{

    try {
        const data = req.body;
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
    const result = await User.find()
    return res.status(200).send(result)
}

exports.getOne = async(req,res)=>{
    const {id} = req.params
    // const id = req.params.id

    // const email = req.query.email

    const result = await User.findById(id)

    return res.status(200).send(result)

}

exports.login = async(req,res)=>{
    const {email,password} = req.body

    const alreadyEmail = await User.findOne({email})

    if(!alreadyEmail){
        return res.status(400).json({message:"User is not created , please signup "})
    }

    return res
      .status(200)
      .json({ message: "User login Sucessfully" });

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
