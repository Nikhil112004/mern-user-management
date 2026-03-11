import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("backend is running");
});


connectDB();

app.listen(3002)