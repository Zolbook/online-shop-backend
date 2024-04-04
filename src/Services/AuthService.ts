import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

const secretkey = 'shefehf3232r83hd86547h32g26deiw997h3h'

class AuthService {
    async registerUser(user: any) {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: user.username,
            },
        });
        if (existingUser) {
            throw new Error('Username already exists.');
        }
        const newUser = await prisma.user.create({
            data: user,
        });
        return newUser;
    }
    

    loginUser = async (user: any) => {
        const checkUser = await prisma.user.findUnique({
            where: {
                username: user.username
            }
        })
        if(!checkUser) {
            console.log('User not found')
        } else {
            const match = await bcrypt.compare(user.password, checkUser.password);
            if (match) {
                const token = jwt.sign({ id: checkUser.id }, secretkey);
                console.log('Login successful', token);
                return token
            }
        }
    }
}

export default new AuthService();