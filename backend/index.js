import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import Router from "./Routes/routes.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", Router);
const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.2pcsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Is Connected Successfully");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
Connection(username, password);
app.listen(PORT, () =>
  console.log(`server is successfully running on port ${PORT}`)
);