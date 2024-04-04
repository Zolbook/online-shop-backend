
import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/VerifyToken.js';



import orderController from '../Controllers/OrderController'

router.post('/order', verifyToken, orderController.createOrder);
router.delete('/order-delete/:id', orderController.deleteOrder)
export default router;