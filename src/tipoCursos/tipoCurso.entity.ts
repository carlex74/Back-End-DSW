import crypto from 'node:crypto';

export class TipoCurso {
  constructor(
    public nombre: string,
    public descripcion: string,
    public id = crypto.randomUUID()
  ) {}
}