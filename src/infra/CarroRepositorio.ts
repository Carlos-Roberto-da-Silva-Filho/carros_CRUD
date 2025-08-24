// Arquivo: src/infra/CarroRepositorio.ts

import path from 'path';
import fs from 'fs';
import { DBSchema } from './DBSchema';
import { Carro } from '../Carro';
import CarroSchema from './CarroSchema';

export default class CarroRepositorio {
    private caminhoArquivo: string;

    constructor(caminho: string = 'fakeBD.json') {
        this.caminhoArquivo = path.join(__dirname, caminho);
        if (!fs.existsSync(this.caminhoArquivo)) {
            this.reescreverBD({ carros: [] });
        }
    }

    private acessoDB(): DBSchema {
        try {
            const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
            if (!bdPuro.trim()) {
                return { carros: [] };
            }
            return JSON.parse(bdPuro);
        } catch (error) {
            console.error('Erro ao ler o arquivo fakeBD.json:', error);
            return { carros: [] };
        }
    }

    private reescreverBD(DbAtualizado: DBSchema): boolean {
        try {
            const jsonString = JSON.stringify(DbAtualizado, null, 2);
            fs.writeFileSync(this.caminhoArquivo, jsonString);
            return true;
        } catch (err) {
            console.error('Erro ao escrever no arquivo:', err);
            return false;
        }
    }

    public listar(): CarroSchema[] {
        const bd = this.acessoDB();
        return bd.carros;
    }

    public buscarPorId(id: number): CarroSchema | undefined {
        const bd = this.acessoDB();
        return bd.carros.find(carro => carro.id === id);
    }
    
    // NOVO MÉTODO: busca por modelo
    public buscarPorModelo(modelo: string): CarroSchema[] {
        const bd = this.acessoDB();
        const nomeNormalizado = modelo.toLowerCase();
        return bd.carros.filter(carro => 
            carro.modelo.toLowerCase().includes(nomeNormalizado)
        );
    }

    public criar(carro: Carro): CarroSchema[] {
        const bd = this.acessoDB();
        const carroSchema: CarroSchema = {
            id: carro.id,
            marca: carro.marca,
            modelo: carro.modelo,
            ano: carro.ano,
            cor: carro.cor,
            placa: carro.placa,
            observacoes: carro.observacoes
        };
        bd.carros.push(carroSchema);
        this.reescreverBD(bd);
        return bd.carros;
    }

    public atualizar(id: number, dadosAtualizados: Partial<Carro>): CarroSchema | undefined {
        const bd = this.acessoDB();
        const index = bd.carros.findIndex(carro => carro.id === id);

        if (index === -1) {
            return undefined;
        }

        bd.carros[index] = {
            ...bd.carros[index],
            ...dadosAtualizados,
            id: id,
        };
        
        const sucesso = this.reescreverBD(bd);
        return sucesso ? bd.carros[index] : undefined;
    }

    public deletar(id: number): boolean {
        const bd = this.acessoDB();
        const index = bd.carros.findIndex(carro => carro.id === id);

        if (index === -1) {
            return false;
        }

        bd.carros.splice(index, 1);
        return this.reescreverBD(bd);
    }
}