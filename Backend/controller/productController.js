const Product = require("../model/productModel")
const User = require("../model/userModel")
const nodemailer = require("nodemailer")

exports.createproduct = async(req,res)=>{
    const {name,price,userId} = req.body
    const userDetail = req.user
    const allUser = await User.find({role:"admin"})
    const allUserEmail = allUser.map((user)=>user.email)

    console.log("////",allUser);
    const allEmail = [...allUserEmail]
    console.log("???", allEmail);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "udawatsudarshansingh@gmail.com",
        pass: "qqyz dabh pshe ktrc",
      },
    });

    const data = {name,price,userId:userDetail._id}
    const newProduct = new Product(data)
    await newProduct.save()

    if(userDetail.role==="user"){
      try {
        const htmlTable = `
        <h3>Hi ${userDetail.name}, you have successfully added this product: ${name}</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-family: Arial;">
          <thead style="background-color: #f2f2f2;">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${name}</td>
              <td>${price}</td>
              <td>${userDetail.name}</td>
            </tr>
          </tbody>
        </table>
      `;
        const info = await transporter.sendMail({
          from: "udawatsudarshansingh@gmail.com",
          to: userDetail.email,
          subject: "Product is Added ⭐⭐",
          html: htmlTable,
        });
        console.log("Email sent:", info.messageId);
      } catch (err) {
        console.error("Error sending email:", err.message);
      }
    }

    try {
      const htmlTable = `
              <h3>Hello Admin , ${userDetail.name} is successfully added ${name} product</h3>
              <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-family: Arial;">
                <thead style="background-color: #f2f2f2;">
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>CreatedBy</th>
                  </tr>
                </thead>
                <tbody>
                  
                    <tr>
                      <td>${name}</td>
                      <td>${price}</td>
                      <td>${userDetail.name}</td>
                    </tr>
                    
                 
                </tbody>
              </table>
            `;
      const info = await transporter.sendMail({
        from: "udawatsudarshansingh@gmail.com",
        to: allEmail,
        subject: "Product is Added ⭐⭐",
        html: htmlTable,
      });
      console.log("Email sent:", info.messageId);
    } catch (err) {
      console.error("Error sending email:", err.message);
    }

    

    return res.status(200).json({message:"Product created successfully",newProduct})
}

exports.getProduct = async(req,res)=>{
    const userdetail = req.user;
    console.log(userdetail,"???");
    const result = await Product.find().populate("userId")
    if(userdetail.role === "admin"){
        const result = await Product.find().populate("userId");
        return res.status(200).json({message:"All Products",result})
    }
    else if(userdetail.role ==="user"){
        const result = await Product.find({ userId: userdetail._id }).populate("userId");
        return res.status(200).json({ message: "All Products", result });
    }
    else if(userdetail.role ==="client"){
        const result = await Product.find().populate("userId").limit(1);
        return res.status(200).json({ message: "All Products", result });
    }

    return res.status(200).json({message:"All Products",result})
}