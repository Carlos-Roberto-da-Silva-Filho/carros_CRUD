import CustomError from "./CustomError";

class NotFoundException extends CustomError{
    constructor(message: string = 'Dados não encontrado'){
        super(message, 404)

    }
}

export default NotFoundException;