// Arquivo: src/api/middleware/basicAuthMiddleware.ts

import { Request, Response, NextFunction } from "express"
import UnauthorizedException from "../Exceptions/UnauthorizedException";

const USUARIO = 'carro'
const SENHA = 'carro123'

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction): void =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Basic ')) {
        // Lança uma exceção para o middleware de erro lidar com ela
        throw new UnauthorizedException('Formato de autenticação inválido!');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if(username === USUARIO && password === SENHA){
        (req as Request & {user: {username: string} }).user = { username };
        next();
    } else {
        // Lança uma exceção para o middleware de erro lidar com ela
        throw new UnauthorizedException('Credenciais de autenticação inválidas!');
    }
}