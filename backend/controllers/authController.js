import  { User } from "../models/index.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email déja utilisé",
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user,
        });
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};