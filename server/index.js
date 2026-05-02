import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/posts.js";
import generateImageRouter from "./routes/generateAI.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));

app.use("/api/posts",router);
app.use("/api/generateImage",generateImageRouter);


// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
}); 


//Default get

app.get("/",async(req, res) => {
    res.status(200).json({
        message: "Welcome to MERN app",
    });
});

// connect to database
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Failed to connect to DB", err));
};
// fuction to start the server

const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
