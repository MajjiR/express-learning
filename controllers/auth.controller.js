import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const {name, email, password} = req.body;
        //check if user exists
        const user = await User.findOne({email});
        if (user) {
            throw new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], {session}); 

        const token = jwt.sign({id: newUser[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'User created successfully',
            user: newUser[0],
            token
        });
        
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
        
    }


    
}


export const signIn = async (req, res, next) => {

    try {

        const {email, password} = req.body;
        console.log(email, password);
        //check if a user exits
        const user = await User.findOne({email});
        if (!user) {
            console.log('User not found');
            throw new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //CHECK IF PASSWORD IS CORRECT

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Password is incorrect');
            throw new Error('Password is incorrect');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        

        res.status(200).json({
            message: 'User signed in successfully',
            token,
            user,
        });

    } catch (error) {
        next(error);
    }


}


export const signOut = async (req, res, next) => {


}
