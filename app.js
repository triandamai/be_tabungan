"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = require("body-parser");
var router_1 = require("./src/router");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use("*", function (req, res) {
    res.send("hai");
});
app.use(router_1.router);
var url = "mongodb://localhost:27017/db_tabungan";
var url2 = "mongodb+srv://Trian:asdf1998Buka@cluster0.ewqld.gcp.mongodb.net/db_tabungan?retryWrites=true&w=majority";
mongoose_1.default.connect(url2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
var connection = mongoose_1.default.connection;
connection.once("open", function () {
    console.log("connection estabilished");
});
app.listen(process.env.PORT || 4000, function () {
    console.log("running");
});
