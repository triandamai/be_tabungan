"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.router = router;
var UserController_1 = require("./Controller/UserController");
var TabunganController_1 = require("./Controller/TabunganController");
var uploader_1 = require("./common/uploader");
var multer_1 = __importDefault(require("multer"));
router.get("/", function (req, res) {
    res.send("hai");
});
router.get("/api", function (req, res) {
    return res.send("hai");
});
router.get("/api/users", UserController_1.user.getAll);
router.get("/api/user/by/:id", UserController_1.user.getById);
router.get("/api/user/order/:uid", UserController_1.user.getByUid);
router.post("/api/login", UserController_1.user.login);
router.post("/api/register", UserController_1.user.register);
router.get("/api/deposit/count", TabunganController_1.tabungan.sum);
router.get("/api/deposits", TabunganController_1.tabungan.getAll);
router.get("/api/deposit/:id", TabunganController_1.tabungan.getById);
router.post("/api/deposit/add", multer_1.default({ storage: uploader_1.Storage }).single("receipt"), TabunganController_1.tabungan.deposit);
router.post("/api/deposit/accept", TabunganController_1.tabungan.acceptDeposit);
router.post("/api/deposit/edit", multer_1.default({ storage: uploader_1.Storage }).single("receipt"), TabunganController_1.tabungan.updateDeposit);
