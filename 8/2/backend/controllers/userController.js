const userSchema = require('../models/userModel');
const bcrypt = require('bcryptjs');

const signupController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fileds are required!!' });
    }
    try {
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            name,
            email,
            hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `User controller error ${error}` });
    }
}

const signinController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fileds are required!!' });
    }
    try {
        const existingUser = await userSchema.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist!!' });
        }
        const comparedPass = bcrypt.compare(password, existingUser.password);
        if (!comparedPass) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        res.status(200).json({ message: 'User signed in successfully!!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `User controller error ${error}` });
    }
}

module.exports = { signupController, signinController };