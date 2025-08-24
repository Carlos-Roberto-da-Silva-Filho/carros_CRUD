// Arquivo: src/Carro.ts

export class Carro {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    cor?: string;
    placa?: string;
    observacoes?: string;

    constructor(
        id: number,
        marca: string,
        modelo: string,
        ano: number,
        cor?: string,
        placa?: string,
        observacoes?: string
    ) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.placa = placa;
        this.observacoes = observacoes;
    }
}

// DTOs - Data Transfer Objects

export type criarCarroDTO = Omit<Carro, 'id'>

export type atualizarCarroDTO = Partial<criarCarroDTO>

export type viewCarroDTO = Omit<criarCarroDTO, 'placa'>