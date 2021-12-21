import express from "express";
import { userSignup , userSignIn ,editUser } from "../controller/user-controller.js";
import auth from '../middleware/auth.js';

const router = express.Router();
router.post("/signup", userSignup);
router.post('/signIn' , userSignIn);
router.patch('/updateUser/:_id' , auth,editUser);

export default router;