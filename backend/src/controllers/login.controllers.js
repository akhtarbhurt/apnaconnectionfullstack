import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import User from "../models/user.models.js";
const secret = "Super@Dooper";

const handlelogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usrdata = await User.findOne({ email: email });

    console.log("userfound", usrdata);
    if (usrdata) {
      bcrypt.compare(password, usrdata.password, (err, response) => {
        if (response) {
          console.log("loged in success");

          // ================token ==============

          const payload = {
            id: usrdata._id,
            email: usrdata.email,
          };
          const token = JWT.sign(payload, secret);
          console.log("token", token);
          res.cookie("token", token, { httpOnly: true });
          return res
            .status(200)
            .json({
              message: "Successfully token stored in cookies",
              user: usrdata,
            });
        } else {
          return res.status(400).json("the password is incorrect");
        }
      });
    } else {
      return res.status(400).json("incorrect email/password");
    }
  } catch (error) {
    return res.status(400).json({ error: "no record founded" });
  }
};

// module.exports = handlelogin;

export default handlelogin;
