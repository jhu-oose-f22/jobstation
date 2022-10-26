import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Routes from "./routes.js"

const app = express();

app.use(bodyParser.json({ limit: "30mb", extented: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true}))
app.use(cors());

app.use(Routes)

const CONNECTION_URL = 'mongodb+srv://lz:lz@bookscluster.vpq1p30.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
