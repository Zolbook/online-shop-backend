"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../Controllers/ProductController"));
const VerifyToken_1 = require("../middlewares/VerifyToken");
const router = express_1.default.Router();
router.get('/', ProductController_1.default.getProducts);
router.post('/', VerifyToken_1.verifyToken, ProductController_1.default.getAllProducts);
router.put('/:id', VerifyToken_1.verifyToken, ProductController_1.default.updateProductWithId);
router.delete('/:id', ProductController_1.default.deleteProductWithId);
exports.default = router;
