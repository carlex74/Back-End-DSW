import crypto from 'node:crypto';

export class Institution {
  constructor(
    public name: string,
    public description: string,
    public id = crypto.randomUUID()
  ) {}
}
