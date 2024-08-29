const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const bcrypt = require('bcrypt');

// sign up 
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
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(201).json({ message: 'User created successfully!!', token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `User controller error ${error}` });
    }
}

// sign in
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
        const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ message: 'User signed in successfully!!', token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `User controller error ${error}` });
    }
}

// change name
const changeNameController = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required!!' });
    }
    try {
        const user = await userSchema.findOneAndUpdate({ email: req.user.email }, { name: name });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!!' });
        }
        res.status(200).json({ message: 'Name changed successfully!!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Change name controller error ${error}` });
    }
}

// change password
const changePasswordController = async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required!!' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.findOneAndUpdate({ email: req.user.email }, { password: hashedPassword });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!!' });
        }
        res.status(200).json({ message: 'Password changed successfully!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Change password controller error ${error}` });
    }
}

// change user details
const changeUserDetailsController = async (req, res) => {
    const updateBody = zod.object({
        name: zod.string().optional(),
        password: zod.string().optional(),
    });
    try {
        const parsedResult = updateBody.safeParse(req.body)
        if (!parsedResult.success) {
            return res.status(400).json({
                message: "Error while updating information",
            });
        }
        const { name, password } = parsedResult.data;
        const updatedData = {};
        if (name) updatedData.name = name;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        const user = await userSchema.findOneAndUpdate({ email: req.user.email }, updatedData);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!!' });
        }
        res.status(200).json({ message: 'User details changed successfully!!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Change user details controller error ${error}` });
    }
}

// get all users
const getAllUsersController = async (req, res) => {
    try {
        const user = await userSchema.find().select('-password');
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!!' });
        }
        res.status(200).json({ message: 'All users fetched successfully!!', data: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Get all users controller error ${error}` });
    }
}

// search user by name
const searchUserByNameController = async (req, res) => {
    const filter = req.query.filter || '';
    try {
        const user = await userSchema.find({
            name: {
                $regex: `^${filter}`,
                $options: 'i'
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User does not exist!!' });
        }
        res.status(200).json({ message: 'User fetched successfully!!', data: user.map(u => ({ _id: u._id, name: u.name, email: u.email })) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Search user by name controller error ${error}` });
    }
}

module.exports = { signupController, signinController, changeNameController, changePasswordController, changeUserDetailsController, getAllUsersController, searchUserByNameController };