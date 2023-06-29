import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import generateToken from "../config/generateToken.js";
import { comparePassword, hashPassword } from "../config/bcryptPass.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user && await comparePassword(password, user.password)) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: await generateToken(user._id)
            })
        } else {
            res.status(400).send({ message: 'Invalid Email or Password' })
        }
    } catch (error) {
        console.log(error);
    }
}
export const signupUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) {
            res.status(400).send({
                message: "Please Enter All the Fields"
            })
        }
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            res.status(400).send({ message: 'User Already Exist' });
        }
        const hashPass = await hashPassword(password);
        const user = await userModel.create({ name, email, password: hashPass, pic });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: await generateToken(user._id)
            })
        } else {
            res.status(400).send({ message: 'Failed to create user' })
        }
    } catch (error) {
        console.log(error);
    }
}
