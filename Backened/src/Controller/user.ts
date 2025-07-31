import userSchema, { IUser } from "../Module/userSchema";
import { Request, Response } from "express";
import {sendMail} from '../mail/Mail'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if(!name ){  res.status(400).json({ msg: "Name is required" }); }
    if(!email ){  res.status(400).json({ msg: "Email is required" }); }
    if(!password ){  res.status(400).json({ msg: "Password is required" }); }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) { res.status(400).json({ msg: "Email already exists" }); }

    const RandomOtp:string = Math.floor(100000 + Math.random() * 900000).toString();
    sendMail(name,email,RandomOtp)

    const bycrptpassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      name,
      email,
      password: bycrptpassword,
      Otp:RandomOtp,
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully", user: newUser });

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error creating user", error });
  }
};



export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "Email and password are required" });
      return;
    }

    const user = await userSchema.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(401).json({ msg: "Invalid email " });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Invalid  password" });
      return;
    }


    const token = jwt.sign({ userId: user._id }, process.env.token || 'defeault token' , { expiresIn: "12h" });

    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      
    };
    res.status(200).json({ msg: "Login successful", data ,token });
  } catch (error ) {
    console.error(error);
    res.status(500).json({ msg:'Server error during login', error });
  }
};

