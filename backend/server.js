import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/",(req, res) => {
    res.json({ message: "Marhba API running"});
});

const PORT = process.env.PORT || 3000;

sequelize
.authenticate()
.then(async () => {
    console.log("Database connected");

   await sequelize.sync();

   console.log("Tables synchronized");
   
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) =>{
    console.error("Databse connection error:", err.message);
});