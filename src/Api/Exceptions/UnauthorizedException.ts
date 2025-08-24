import CustomError from "./CustomError";

class UnauthorizedException extends CustomError{
    constructor(message: string = 'Acesso não autorizado!'){
        super(message, 401)

    }
}

export default UnauthorizedException;