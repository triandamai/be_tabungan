import express from "express";

const router = express.Router();

import { user } from "./Controller/UserController";
import { tabungan } from "./Controller/TabunganController";
import { Storage } from "./common/uploader";
import multer from "multer";

router.get("/api", (req, res) => {
  return res.send("hai");
});
router.get("/api/users", user.getAll);
router.get("/api/user/by/:id", user.getById);
router.get("/api/user/order/:uid", user.getByUid);
router.post("/api/login", user.login);
router.post("/api/register", user.register);

router.get("/api/deposit/count", tabungan.sum);
router.get("/api/deposits", tabungan.getAll);
router.get("/api/deposit/:id", tabungan.getById);
router.post(
  "/api/deposit/add",
  multer({ storage: Storage }).single("receipt"),
  tabungan.deposit
);

router.post("/api/deposit/accept", tabungan.acceptDeposit);
router.post(
  "/api/deposit/edit",
  multer({ storage: Storage }).single("receipt"),
  tabungan.updateDeposit
);
export { router };
