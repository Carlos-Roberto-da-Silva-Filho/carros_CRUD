import { NextFunction, Request, Response } from "express";

class Loger {
    private static implementacao(req: Request, res: Response, next: NextFunction) {
        const timeStamp = new Date().toLocaleTimeString();
        console.info(`A APi foi chamada às ${timeStamp} com o método ${req.method} na url ${req.url}`);
        next();
    }

    static init(){
        return this.implementacao;
    }
}

export default Loger;

