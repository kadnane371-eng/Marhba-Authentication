import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

       
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });
         const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

 export const login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({
                    where: { email },
                });

                if (!user) {
                    return res.status(401).json({
                        message: "Email ou mot de passe incorrect",
                    });
                }


                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({
                        message: "Email ou mot de passe incorrect",
                    });
                }


                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                res.status(200).json({
                    message: "Connexion réussie",
                    token,
                    user: {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                    },
                });
            }catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        
      export const profile = async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: {
                    exclude: ["password"],
                },
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
      };
