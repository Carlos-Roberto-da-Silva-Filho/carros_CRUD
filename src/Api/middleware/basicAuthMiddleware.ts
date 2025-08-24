import { Request, Response, NextFunction } from "express"
import UnauthorizedException from "../Exceptions/UnauthorizedException";

const USUARIO = 'carro'
const SENHA = 'carro123'

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction): void =>{
    // Pega o header Authorization
    const authHeader = req.headers.authorization;

    // Se não há header de autorização, solicita credenciais
    if(!authHeader){
        res.status(401)
            .set('WWW-Authenticate','Basic realm="Protected route"')
            .json({
                error: 'Acesso Negado',
                message: 'Credenciais de autenticação são necessárias!'
            });
        return;
    }
    // Verifica se o header começa com "Basic "
    if(!authHeader.startsWith('Basic ')) {
        res.status(401).json({
            error: 'Formato de Autenticação inválido!',
            message: 'use Basic Auth'
        })
        return;
    }

    // Extrai e decodifica as credenciais
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Valida as credenciais
    if(username === USUARIO && password === SENHA){
        // Adiciona informações do usuário ao request para uso posterior
        (req as Request & {user: {username: string} }).user = { username };
        next();
    } else{
        throw new UnauthorizedException();
    }
}