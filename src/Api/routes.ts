import { Router } from "express";
import CarroRepositorio from "../infra/CarroRepositorio";
import CarrosController from "./CarrosController";

const routes = Router();

// Comentário: Instanciando o repositório para injeção de dependência
const carroRepositorio = new CarroRepositorio();

// Comentário: Passando o repositório para o controlador
const carrosController = new CarrosController(carroRepositorio);

// Comentário: Montando o roteador do controlador no caminho /carros
routes.use('/carros', carrosController.router);

export default routes;