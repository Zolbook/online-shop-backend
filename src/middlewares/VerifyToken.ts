import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


const secretkey = 'shefehf3232r83hd86547h32g26deiw997h3h'
export const verifyToken =(req:any, res:any, next:any) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send('Token not provided');
        }
        const decoded = jwt.verify(token, secretkey);
        console.log("Decoded Token:", decoded);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).send('Invalid or missing token');
    }
};