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
const OrderService_1 = __importDefault(require("../Services/OrderService"));
class OrderController {
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const data = {
                    user_id: userId,
                    products: req.body.products,
                };
                const orderService = new OrderService_1.default();
                const result = yield orderService.createOrder(data);
                res.status(201).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = parseInt(req.params.id);
            const orderService = new OrderService_1.default();
            const deletedOrder = yield orderService.deleteOrderProduct(orderId);
            return res.json({ message: 'Order deleted successfully', data: deletedOrder });
        });
    }
}
exports.default = new OrderController;
