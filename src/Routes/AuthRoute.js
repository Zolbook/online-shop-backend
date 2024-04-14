"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../Controllers/AuthController"));
const router = express_1.default.Router();
router.post('/register', AuthController_1.default.getUser);
router.post('/login', AuthController_1.default.loginUser);
exports.default = router;
