"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabungan = void 0;
var uploader_1 = require("../common/uploader");
var utils_1 = require("../common/utils");
var validation_1 = require("../common/validation");
var SchemaModel_1 = require("../models/SchemaModel");
var TabunganController = /** @class */ (function () {
    function TabunganController() {
    }
    /**
     * save deposit
     * @param req
     * @param res
     * @returns {code,data,message}
     */
    TabunganController.prototype.deposit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isValid, invalidMessages, myFile, typeFile, _b, url, uploaded, fileName, _c, sender, nominal, description, tabungan_1, saved;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, validation_1.validate(req.body, [
                            { field: "sender", type: "string", required: true },
                            { field: "nominal", type: "string", required: true },
                            { field: "description", type: "string", required: true },
                        ])];
                    case 1:
                        _a = _d.sent(), isValid = _a.isValid, invalidMessages = _a.invalidMessages;
                        myFile = req.file.originalname.split(".");
                        typeFile = myFile[myFile.length - 1];
                        return [4 /*yield*/, uploader_1.uploader(req, typeFile)];
                    case 2:
                        _b = _d.sent(), url = _b.url, uploaded = _b.uploaded, fileName = _b.fileName;
                        if (!uploaded) return [3 /*break*/, 4];
                        // return send.failed(res, { code: 400, data: req.body, message: "" });
                        if (!isValid)
                            return [2 /*return*/, utils_1.send.failed(res, {
                                    code: 400,
                                    data: invalidMessages,
                                    message: "",
                                })];
                        _c = req.body, sender = _c.sender, nominal = _c.nominal, description = _c.description;
                        tabungan_1 = SchemaModel_1.Tabungan.build({
                            sender: sender,
                            nominal: nominal,
                            receipt: url,
                            receiptname: fileName,
                            accepted: "",
                            tabungantype: "deposit",
                            description: description,
                            created: Date.now(),
                            updated: Date.now(),
                        });
                        return [4 /*yield*/, tabungan_1.save()];
                    case 3:
                        saved = _d.sent();
                        if (!saved)
                            return [2 /*return*/, utils_1.send.failed(res, { code: 400, data: {}, message: "Gagal" })];
                        return [2 /*return*/, utils_1.send.success(res, { code: 201, data: saved, message: "Berhasil" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    TabunganController.prototype.acceptDeposit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isValid, invalidMessages, _b, id, uid;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, validation_1.validate(req.body, [
                            { field: "uid", type: "string", required: true },
                            { field: "id", type: "string", required: true },
                        ])];
                    case 1:
                        _a = _c.sent(), isValid = _a.isValid, invalidMessages = _a.invalidMessages;
                        if (!isValid)
                            return [2 /*return*/, utils_1.send.failed(res, {
                                    code: 400,
                                    data: invalidMessages,
                                    message: "failed",
                                })];
                        _b = req.body, id = _b.id, uid = _b.uid;
                        SchemaModel_1.Tabungan.findByIdAndUpdate(id, { accepted: uid }, { new: true }, function (err, result) {
                            if (err)
                                return utils_1.send.failed(res, { code: 400, data: err, message: "Gagal" });
                            if (result)
                                return utils_1.send.success(res, {
                                    code: 200,
                                    data: result,
                                    message: "Berhasil memverifikasi",
                                });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    TabunganController.prototype.updateDeposit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isValid, invalidMessages, myFile, typeFile, _b, url, uploaded, fileName, _c, id, sender, nominal, description;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, validation_1.validate(req, [
                            { field: "id", type: "string", required: true },
                            { field: "sender", type: "string", required: true },
                            { field: "nominal", type: "string", required: true },
                            { field: "description", type: "string", required: true },
                        ])];
                    case 1:
                        _a = _d.sent(), isValid = _a.isValid, invalidMessages = _a.invalidMessages;
                        myFile = req.file.originalname.split(".");
                        typeFile = myFile[myFile.length - 1];
                        return [4 /*yield*/, uploader_1.uploader(req, typeFile)];
                    case 2:
                        _b = _d.sent(), url = _b.url, uploaded = _b.uploaded, fileName = _b.fileName;
                        if (uploaded) {
                            if (!isValid)
                                return [2 /*return*/, utils_1.send.failed(res, {
                                        code: 400,
                                        data: invalidMessages,
                                        message: "Beberapa Field wajib diisi",
                                    })];
                            _c = req.body, id = _c.id, sender = _c.sender, nominal = _c.nominal, description = _c.description;
                            SchemaModel_1.Tabungan.findByIdAndUpdate(id, {
                                sender: sender,
                                nominal: nominal,
                                receipt: url,
                                receiptname: fileName,
                                description: description,
                                created: Date.now(),
                                updated: Date.now(),
                            }, { new: true }, function (err, data) {
                                if (err)
                                    return utils_1.send.failed(res, { code: 400, data: {}, message: "Gagal" });
                                return utils_1.send.created(res, {
                                    code: 201,
                                    data: data,
                                    message: "Berhasil",
                                });
                            });
                        }
                        else {
                            return [2 /*return*/, utils_1.send.failed(res, {
                                    code: 400,
                                    data: {},
                                    message: "Bukti tidak terupload",
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    TabunganController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tabungan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SchemaModel_1.Tabungan.find().sort({ updated: -1 })];
                    case 1:
                        tabungan = _a.sent();
                        return [2 /*return*/, utils_1.send.success(res, { code: 200, data: tabungan, message: "Oke" })];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    TabunganController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tabungan_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SchemaModel_1.Tabungan.findOne({ _id: req.params.id })];
                    case 1:
                        tabungan_2 = _a.sent();
                        if (tabungan_2)
                            return [2 /*return*/, utils_1.send.success(res, {
                                    code: 200,
                                    data: [tabungan_2],
                                    message: "Oke",
                                })];
                        else
                            return [2 /*return*/, utils_1.send.failed(res, { code: 400, data: [], message: "not oke" })];
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, utils_1.send.failed(res, { code: 400, data: [], message: "not oke" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    TabunganController.prototype.sum = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SchemaModel_1.Tabungan.aggregate([
                            {
                                $group: {
                                    _id: null,
                                    total: {
                                        $sum: "$nominal",
                                    },
                                },
                            },
                        ])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, utils_1.send.success(res, { code: 200, data: data, message: "" })];
                }
            });
        });
    };
    return TabunganController;
}());
var tabungan = new TabunganController();
exports.tabungan = tabungan;
