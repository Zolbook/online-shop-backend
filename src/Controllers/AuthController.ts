
import AuthService from "../Services/AuthService";
import bcrypt from 'bcrypt'


class AuthController {
    async getUser  (req: any, res:any, next: any) {
        try {
const {username, password} = req.body;
const hash = await bcrypt.hash(password, 10)
const users = await AuthService.registerUser({username, password:hash})
    
return res.status(201).json(users)
}
   catch(error:any) {
    if (error.message === 'Username already exists.') {
        res.status(409).json({ message: error.message }); 
    } else {
        res.status(500).json({ message: 'Internal server error' }); 
    }
   }

}

    async loginUser(req:any, res:any, next:any) {
        try {
            const { username, password } = req.body;
            const token = await AuthService.loginUser({ username, password });

            if (!token) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            res.json({ token });
        } catch (error) {
            console.error('Login error:', error);
            next(error);
        }
    }
}

export default new AuthController;