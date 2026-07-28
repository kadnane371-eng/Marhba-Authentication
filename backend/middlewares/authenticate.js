import jwt from "jsonwebtoken";

export const protect = async (req, resizeBy, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return resizeBy.status(401).json({
                message: "Token manquant",
            });
        }

        const token = authHeader.split("")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    }catch (error) {
        resizeBy.status(401).json({
            message: "Token invalide",
        });
    }
};