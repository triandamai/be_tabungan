import express from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import { router } from "./src/router";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(router);

mongoose.connect(
  "mongodb+srv://Trian:asdf1998Buka@cluster0.ewqld.gcp.mongodb.net/db_tabungan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection estabilished");
});
app.listen(3000, () => {
  console.log("running");
});
