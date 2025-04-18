import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized, Please Log In" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.status(401).json({ success: false, message: "Not Authorized, Invalid Token" });
        }

        req.body.userId = tokenDecode.id;
        next();
        
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

