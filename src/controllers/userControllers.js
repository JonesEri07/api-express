import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) { // user is logged in, proceed
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized user!'});
    }
}

export const register = (req, res) => {
    try {
        console.log(req.body);
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
        newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !user.comparePassword(req.body.password, user.hashPassword)) {
            res.status(401).json({ message: 'Authenitcation failed, incorrect email and/or password' });
        } else {
            res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, process.env.TOKEN_SECRET)});
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}