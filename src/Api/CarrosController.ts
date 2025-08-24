// Arquivo: src/api/CarrosController.ts

import { Router, Request, Response } from 'express';
import CarroRepositorio from '../infra/CarroRepositorio';
import { atualizarCarroDTO, criarCarroDTO, Carro, viewCarroDTO } from '../Carro';
import CarroSchema from '../infra/CarroSchema';
import { body, param, query, validationResult } from 'express-validator';
import NotFoundException from './Exceptions/NotFoundException';

export default class CarrosController {
    private readonly carroRepositorio: CarroRepositorio;
    public router: Router = Router();

    constructor(carroRepositorio: CarroRepositorio) {
        this.carroRepositorio = carroRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', [
            query('modelo').optional().isString().withMessage('O modelo deve ser uma string.')
        ], this.buscarCarros.bind(this));
        
        this.router.get('/:id', [
            param('id').notEmpty().isNumeric().withMessage('O ID deve ser um número!')
        ], this.buscarCarroPorID.bind(this));

        this.router.post('/', [
            body('marca').exists().withMessage('O campo "marca" é obrigatório!').isString(),
            body('modelo').exists().withMessage('O campo "modelo" é obrigatório!').isString(),
            body('ano').exists().withMessage('O campo "ano" é obrigatório!').isInt({ min: 1900, max: 2100 }).withMessage('O "ano" deve ser um ano válido!'),
            body('cor').optional().isString(),
            body('placa').optional().isString(),
            body('observacoes').optional().isString(),
        ], this.criarCarro.bind(this));
        
        this.router.patch('/:id', [
            param('id').notEmpty().isNumeric().withMessage('O ID deve ser um número!'),
            body('marca').optional().isString(),
            body('modelo').optional().isString(),
            body('ano').optional().isInt({ min: 1900, max: 2100 }).withMessage('O "ano" deve ser um ano válido!'),
            body('cor').optional().isString(),
            body('placa').optional().isString(),
            body('observacoes').optional().isString(),
        ], this.atualizarCarroPorID.bind(this));
        
        this.router.delete('/:id', [
            param('id').notEmpty().isNumeric().withMessage('O ID deve ser um número!')
        ], this.deletarCarroPorId.bind(this));
    }

    public buscarCarros(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const modeloParaBuscar = req.query.modelo as string | undefined;
        let carros: CarroSchema[];

        if (modeloParaBuscar) {
            carros = this.carroRepositorio.buscarPorModelo(modeloParaBuscar);
        } else {
            carros = this.carroRepositorio.listar();
        }

        const carrosDTO: viewCarroDTO[] = carros.map(carro => ({
            marca: carro.marca,
            modelo: carro.modelo,
            ano: carro.ano,
            cor: carro.cor,
        } as viewCarroDTO));

        res.status(200).json(carrosDTO);
    }

    public buscarCarroPorID(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const id = Number(req.params.id);
        const carro = this.carroRepositorio.buscarPorId(id);

        if (carro) {
            const carroDTO: viewCarroDTO = {
                marca: carro.marca,
                modelo: carro.modelo,
                ano: carro.ano,
                cor: carro.cor,
            };
            return res.status(200).json(carroDTO);
        }

        throw new NotFoundException("Carro não encontrado!");
    }

    public criarCarro(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const dadosCarro: criarCarroDTO = req.body;
        const carros = this.carroRepositorio.listar();
        const idsExistentes = carros.map(carro => carro.id);
        const novoId = idsExistentes.length > 0 ? Math.max(...idsExistentes) + 1 : 1;
        
        const novoCarro = new Carro(
            novoId,
            dadosCarro.marca,
            dadosCarro.modelo,
            dadosCarro.ano,
            dadosCarro.cor,
            dadosCarro.placa,
            dadosCarro.observacoes
        );
        
        this.carroRepositorio.criar(novoCarro);
        res.status(201).json(novoCarro);
    }

    public atualizarCarroPorID(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        
        const id = Number(req.params.id);
        const dadosAtualizados: atualizarCarroDTO = req.body;

        const carroAtualizado = this.carroRepositorio.atualizar(id, dadosAtualizados);
        
        if (carroAtualizado) {
            const carroDTO: viewCarroDTO & { id: number } = {
                id: carroAtualizado.id,
                marca: carroAtualizado.marca,
                modelo: carroAtualizado.modelo,
                ano: carroAtualizado.ano,
                cor: carroAtualizado.cor,
            };
            return res.status(200).json(carroDTO);
        }

        throw new NotFoundException("Carro não encontrado!");
    }

    public deletarCarroPorId(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        
        const id = Number(req.params.id);
        const sucesso = this.carroRepositorio.deletar(id);

        if (sucesso) {
            return res.status(204).json({ message: "Carro excluído com sucesso!" });
        }
        
        throw new NotFoundException("Carro não encontrado!");
    }
}