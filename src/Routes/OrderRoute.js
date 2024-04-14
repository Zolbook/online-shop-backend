"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const VerifyToken_js_1 = require("../middlewares/VerifyToken.js");
const OrderController_1 = __importDefault(require("../Controllers/OrderController"));
router.post('/order', VerifyToken_js_1.verifyToken, OrderController_1.default.createOrder);
router.delete('/order-delete/:id', OrderController_1.default.deleteOrder);
exports.default = router;
