export const validateRegister = (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires",
        });
    }
    next();
};