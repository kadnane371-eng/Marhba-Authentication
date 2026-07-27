const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

app.get("/",(req, res) => {
    res.json({ message: "Marhba API running"});
});

const PORT = process.env.PORT || 3000;

sequelize
.authenticate()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) =>{
    console.error("Databse connection error:", err.message);
});