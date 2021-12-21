import User from "../model/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import  mongoose  from "mongoose";

export const userSignup = async (request, response) => {
    try {
      const exist = await User.findOne({ email: request.body.email });
      if (exist) {
        return response.status(401).json("User already exist");
      }
      const user = request.body;
      //const newUser = new User(user);
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      
      user.password = encryptedPassword;
      const newUser = new User(user);
      await newUser.save();

      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
    // Create token
    //user.token = token;
    response.setHeader("auth-token" , token.toString());
      response.status(200).json("user is successfully registered");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  export const userSignIn = async (request, response) => {
    const user = request.body;
    const account = await User.findOne({ email: user.email});
    if (!account || !bcrypt.compareSync(user.password, account.password)) {
      // authentication failed
      return response.status(401).json("Invalid Credintials");
  } else {
      // authentication successful
      response.status(200).json(account);
  }
  }

  export const editUser = async (request , response) => {
      const  id  = request.params._id;
      const { firstname, lastname, email, selectedFile} = request.body;
      console.log(request.body.firstname);
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    
      const updatedPost = { firstname, lastname, email, selectedFile, _id: id };
    
      await User.findByIdAndUpdate(id, updatedPost, { new: true });
    
      response.json(updatedPost);
  }