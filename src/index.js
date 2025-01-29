const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const carRouter = require("./routes/carRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/car", carRouter)
app.use("/uploads", express.static("uploads"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Anish Cars Management API");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port no. " + PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });