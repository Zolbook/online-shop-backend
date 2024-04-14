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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const secretkey = 'shefehf3232r83hd86547h32g26deiw997h3h';
class AuthService {
    constructor() {
        this.loginUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield prisma.user.findUnique({
                where: {
                    username: user.username
                }
            });
            if (!checkUser) {
                console.log('User not found');
            }
            else {
                const match = yield bcrypt_1.default.compare(user.password, checkUser.password);
                if (match) {
                    const token = jsonwebtoken_1.default.sign({ id: checkUser.id }, secretkey);
                    console.log('Login successful', token);
                    return token;
                }
            }
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: {
                    username: user.username,
                },
            });
            if (existingUser) {
                throw new Error('Username already exists.');
            }
            const newUser = yield prisma.user.create({
                data: user,
            });
            return newUser;
        });
    }
}
exports.default = new AuthService();
