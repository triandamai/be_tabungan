"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
var Send = /** @class */ (function () {
    function Send() {
    }
    Send.prototype.success = function (res, payload) {
        res.status(200).json(payload);
    };
    Send.prototype.created = function (res, payload) {
        res.status(201).json(payload);
    };
    Send.prototype.failed = function (res, payload) {
        res.status(400).json(payload);
    };
    Send.prototype.internalError = function (res, payload) {
        res.status(500).json(payload);
    };
    return Send;
}());
var send = new Send();
exports.send = send;
