const User = require('../models/userModel');

const updateUserController = async(req, res, next) => {
    const { name, email, location } = req.body;
    if (!name || !email || !location) {
        next("Please Provide All Fields");
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user,
        token,
    });
};


module.exports = updateUserController;