"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.Storage = void 0;
var multer_1 = __importDefault(require("multer"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var Storage = multer_1.default.memoryStorage();
exports.Storage = Storage;
function uploader(req, fileType) {
    return new Promise(function (resolve) {
        var s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.AWS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
        var receiptname = req.body.receiptname;
        var name = "";
        if (receiptname) {
            name = receiptname;
        }
        else {
            name = Date.now().toString() + "." + fileType;
        }
        s3.deleteObject({ Bucket: "" + process.env.AWS_BUCKET, Key: name }, function (err, data) {
            console.log(err + " -> " + data);
        });
        s3.upload({
            ACL: "public-read",
            Bucket: "" + process.env.AWS_BUCKET,
            Body: req.file.buffer,
            Key: "receipt/" + name
        }, function (err, data) {
            if (err)
                return resolve({ url: "", uploaded: false, fileName: "" });
            if (data) {
                // fs.unlinkSync(req.file.path);
                return resolve({
                    url: data.Location,
                    uploaded: true,
                    fileName: "" + name
                });
            }
        });
    });
}
exports.uploader = uploader;
