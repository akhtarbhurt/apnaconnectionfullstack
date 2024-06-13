import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import nodemailer from "nodemailer"
const secret = "Super@Dooper"
// import upload from "../middlewares/uploadimg.js"
import upload from "../middleware/uploadImg.middleware.js"
import crypto from 'crypto';
import User from "../models/user.models.js"
import signupSchema from "../validator/auth.validator.js"
import cloudinaryUser from "../utils/userCloudinary.js"
import { Warning } from "../models/warning.models.js"

const handleregister = async (req, res) => {
  console.log("chalraha hai yaha tak")

  const { name, email, password, confirmpassword,profileImageURL } = req.body;
  
  try {
    let usrdata =await User.findOne({email:email})
if(usrdata){
  return res.json({msg:"email already exist"})
}

else{
    // Validate the formData with Zod
    signupSchema.parse({ name, email, password, confirmpassword });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
let profileImageURL;

    // ============cloudinary data===============
// if(req.file){

//    g = await cloudinary.uploader.upload(req.file.path, function (err, result){
//       try{
//         console.log("sucessfully cloudinary uploaded from here", result)
      
//         return result.url
//       }      catch(err){
//         console.log(err);
//        return err
//       }
//       })

//       console.log("cloudinary funtion data",g.url)

//     }

if (req.file) {
  const result = await cloudinaryUser.uploader.upload(req.file.path);
  profileImageURL = result.url;
} else {
  profileImageURL = `https://cdn.pixabay.com/photo/2021/09/13/08/16/purple-flower-6620617_1280.jpg`;
}
      // ========cloudinary =====================


  const payload = await User.create({
    name,
    email,
    password: hashedPassword,
    confirmpassword, // It's better to store only the hashed password
    profileImageURL,
    emailVerified: false,
Token:hashedPassword
  });


const verificationToken = hashedPassword;
const verificationUrl = `http://localhost:5173/verify-email/${payload._id}`;


var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
         user: "a71899af5ab622",
    pass: "6fc90e1362b7ad"
  }
});


const mailOptions = {
  from: 'muhammadriyansadiq786@gmail.com',
  to: payload.email,
  subject: 'Email Verification',
  html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`
};


transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
      console.log("errfromtransporter", error);
      return res.status(500).json({ error: 'Email could not be sent.' });
  } else {
      return res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
  }
});
res.clearCookie('token');
}


  }
  
  
  catch (err) {
    console.error("error from uploading fileimage",err);
    return res.status(400).json(err);
  }
  };


const handleUpdateregister = async (req, res) => {

//   try{

// const formdata = await req.body
// const {id} = await req.params

// // const payload = await User.findByIdAndUpdate(id,{
// //   name, email,password,profileImageURL
// // })

// console.log("req body",id, formdata)

// return res.json({msg:id})

// }

// catch(err){
//   console.log(err)
// }


// try {
//   const { name, email, password } = req.body;
//   const { id } = req.params;

//   // Process file if uploaded
//   let profileImageURL;
//   if (req.file) {
//     // Upload to cloudinary or any other storage and get the URL
//     const result = await cloudinary.uploader.upload(req.file.path);
//     profileImageURL = result.url;
//   }

//   // Find and update user
//   const updatedUser = await User.findByIdAndUpdate(id, {
//     name,
//     email,
//     password,
//     profileImageURL
//   }, { new: true });

//   console.log("Updated user:", updatedUser);
//   res.json({ msg: "Profile updated successfully", user: updatedUser });

// } catch (err) {
//   console.log(err);
//   res.status(500).json({ msg: "Internal server error" });
// }

try{
const { name, email, password } = req.body;
    const { id } = req.params;

    // Initialize an update object
    let updateData = {};

    // Add provided fields to the update object
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    // if (password) updateData.password = password; // Consider hashing the password here if needed
// Hash the password if it is provided
if (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  updateData.password = hashedPassword;
}
    // Process file if uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profileImageURL = result.url;
      console.log("file checking inside",result)
    }
    // Find and update user with the update object
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    console.log("file path checking outside",req.file)

    console.log("Updated user:", updatedUser);
    res.json({ msg: "Profile updated successfully", user: updatedUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }

};

const handleGenerateWarning = async (req, res)=>{
  try {
    const { userID, warningText } = req.body;

    const user = await User.findById(userID);
    if (user) {
      user.warnings.push(warningText);
      user.hasSeenWarning = false; // Set the flag to false whenever a new warning is added
      await user.save();
      res.status(200).json({ message: 'Warning added successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding warning:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getHandleGenerateWarning = async (req, res)=>{
  try {
    const {userID} = req.params
    const payload = await User.findById(userID)
    return res.status(200).json({result : payload})
  } catch (error) {
    console.error('Error adding warning:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { handleregister, handleUpdateregister, handleGenerateWarning, getHandleGenerateWarning }