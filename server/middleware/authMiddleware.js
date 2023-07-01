import jwt from 'jsonwebtoken'
import userModel from '../Models/userModel.js';


export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //decodes token id
            const decoded = jwt.verify(token, process.env.SecretKey);

            req.user = await userModel.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            res.status(401);
        }
    }

    if (!token) {
        res.status(401);
    }
}