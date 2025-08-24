export default interface CarroSchema {
  // chave primária
  id: number;

  // obrigatórios
  marca: string;
  modelo: string;
  ano: number;

  // opcionais
  cor?: string;
  placa?: string;
  observacoes?: string;
}
