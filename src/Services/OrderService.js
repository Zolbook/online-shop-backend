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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class OrderService {
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalPrice = 0;
            const order = yield prisma.order.create({
                data: {
                    userId: data.user_id,
                    totalPrice,
                },
            });
            yield Promise.all(data.products.map((value) => __awaiter(this, void 0, void 0, function* () {
                const product = yield prisma.product.findUnique({
                    where: {
                        id: value.product_id,
                    },
                });
                if (product) {
                    totalPrice += product.price * value.quantity;
                    yield prisma.orderProduct.create({
                        data: {
                            productId: product.id,
                            orderId: order.id,
                            quantity: value.quantity,
                        },
                    });
                }
            })));
            yield prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    totalPrice: totalPrice,
                },
            });
            return 'ok';
        });
    }
    deleteOrderProduct(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePr = yield prisma.order.delete({
                where: {
                    id: orderId
                }
            });
            return deletePr;
        });
    }
}
exports.default = OrderService;
