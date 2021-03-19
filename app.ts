import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import { router } from "./src/router";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://myproject-64aac.web.app",
    exposedHeaders: ["Content-Type"],
  })
);
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  res.header("Content-Type", "*");
  next();
});
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

const url = "mongodb://localhost:27017/db_tabungan";
const url2 =
  "mongodb+srv://Trian:asdf1998Buka@cluster0.ewqld.gcp.mongodb.net/db_tabungan?retryWrites=true&w=majority";
mongoose.connect(url2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection estabilished");
});
app.listen(process.env.PORT || 4000, () => {
  console.log("running");
});
