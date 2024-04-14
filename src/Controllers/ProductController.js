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
const ProductService_1 = __importDefault(require("../Services/ProductService"));
class ProductController {
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield ProductService_1.default.findProduct(req.query);
            return res.json(products);
        });
    }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, image, price, colors } = req.body;
            const products1 = yield ProductService_1.default.createProduct({ name, image, price, colors });
            return res.json(products1);
        });
    }
    updateProductWithId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield ProductService_1.default.updateProduct(parseInt(req.params.id), req.body);
            return res.json(updatedProduct);
        });
    }
    deleteProductWithId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield ProductService_1.default.deleteProduct(parseInt(req.params.id));
            return res.json(deleteProduct);
        });
    }
}
exports.default = new ProductController;
