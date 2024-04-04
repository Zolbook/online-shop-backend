import express from 'express';
import * as ProtectedController from '../Controllers/ProtectedRouteController'
import { verifyToken } from '../middlewares/VerifyToken.js';


const router = express.Router();


router.get('/protected', verifyToken,  ProtectedController.ProtectedRouteHandler);

export default router