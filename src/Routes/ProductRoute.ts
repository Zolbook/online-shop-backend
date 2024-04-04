import express from 'express';
import ProductController from '../Controllers/ProductController';
import { verifyToken } from '../middlewares/VerifyToken';

const router = express.Router();

router.get('/', ProductController.getProducts)
router.post('/', verifyToken, ProductController.getAllProducts);
router.put('/:id', verifyToken , ProductController.updateProductWithId);
router.delete('/:id', ProductController.deleteProductWithId);


export default router;