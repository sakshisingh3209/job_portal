const { isMatch } = require('lodash');
const User = require('../models/userModel');
const registerController = async(req, res, next) => {

    const { name, email, password } = req.body;
    //validate
    if (!name || !email || !password) {
        next('Missing fields is required');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        next('Email is already registerd');

    }
    const user = await User.create({ name, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: "User created successfully",
        user: {
            name: user.name,
            email: user.email,
            location: user.location,
        },
        token,
    });

};


const loginController = async(req, res, next) => {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
        next('Please provide all fields');
    }

    //find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {;
        if (!user) {
            next('Invalid Username or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            next('Invalid Username or password');
        }
        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                location: user.location,
            },
            token,
        });
    };

}
module.exports = { registerController, loginController };