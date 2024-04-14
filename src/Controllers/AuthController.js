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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../Services/AuthService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const hash = yield bcrypt_1.default.hash(password, 10);
                const users = yield AuthService_1.default.registerUser({ username, password: hash });
                return res.status(201).json(users);
            }
            catch (error) {
                if (error.message === 'Username already exists.') {
                    res.status(409).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Internal server error' });
                }
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield AuthService_1.default.loginUser({ username, password });
                if (!token) {
                    return res.status(401).json({ message: 'Authentication failed' });
                }
                res.json({ token });
            }
            catch (error) {
                console.error('Login error:', error);
                next(error);
            }
        });
    }
}
exports.default = new AuthController;
