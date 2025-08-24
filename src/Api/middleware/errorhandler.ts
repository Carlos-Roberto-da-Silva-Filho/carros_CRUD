import { Request, Response, NextFunction } from 'express';
import CustomError from '../Exceptions/CustomError';

export default function errorhandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        return res.status(error.getStatus()).json({
            error: error.message,
            status: error.getStatus(),
        });
    }

    const statusError = 500;
    const message = "Erro interno do servidor!";

    console.error('status:', statusError, 'mensagem:', error.message);

    res.status(statusError).json({
        error: message,
        status: statusError,
    });
}