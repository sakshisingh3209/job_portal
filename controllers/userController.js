const updateUserController = async(req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        next('Please provide all fields');
    }
}


module.exports = updateUserController;