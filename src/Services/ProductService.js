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
class ProductService {
    constructor() {
        this.findProduct = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 20;
            const offset = (page - 1) * limit;
            console.log(query);
            let prismaQuery = {
                take: limit,
                skip: offset,
            };
            const totalProducts = yield prisma.product.count();
            const totalPages = Math.ceil(totalProducts / limit);
            if (query.sort) {
                let sortQuery = query.sort.split(",");
                console.log(sortQuery);
                prismaQuery = {
                    orderBy: [
                        { [sortQuery[0]]: sortQuery[1] }
                    ]
                };
            }
            if (query.name) {
                prismaQuery = Object.assign(Object.assign({}, prismaQuery), { where: {
                        name: {
                            startsWith: query.name
                        }
                    } });
            }
            const products = yield prisma.product.findMany(prismaQuery);
            return {
                products, page, limit, totalPages
            };
        });
        this.createProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield prisma.product.create({
                data: product
            });
            return createdProduct;
        });
    }
    updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePr = yield prisma.product.update({
                where: {
                    id: id
                },
                data: data
            });
            return updatePr;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePr = yield prisma.product.delete({
                where: {
                    id: id
                },
            });
            return deletePr;
        });
    }
}
exports.default = new ProductService();
