const User = require("../models/User");

exports.uploadProfile = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $set: { imageUrl: req.file.filename },
        });
        res.send("image uploaded");
    } catch (error) {
        console.log(error.message);
    }
};
