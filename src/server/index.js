import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRouter from "./routers/posts.js"
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extented: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true}))
app.use(cors());

app.use(postRouter)

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
