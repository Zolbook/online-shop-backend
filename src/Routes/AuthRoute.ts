import express from 'express';
import AuthController from '../Controllers/AuthController';

const router = express.Router();

router.post('/register', AuthController.getUser);
router.post('/login', AuthController.loginUser);

export default router;