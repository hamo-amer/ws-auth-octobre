const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ errors: [{ msg: "you are not authorized" }] });
        }
        const decoded = jwt.verify(token, process.env.secret_key);
        if (!decoded) {
            return res
                .status(401)
                .json({ errors: [{ msg: "you are not authorized" }] });
        }
        req.user = {
            id: decoded.id,
        };
        next();
    } catch (error) {
        res.status(401).json({ errors: [{ msg: "you are not authorized" }] });
    }
};
module.exports = isAuth;
