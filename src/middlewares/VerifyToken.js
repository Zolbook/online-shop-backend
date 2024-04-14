"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretkey = 'shefehf3232r83hd86547h32g26deiw997h3h';
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).send('Token not provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretkey);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Invalid or missing token');
    }
};
exports.verifyToken = verifyToken;
