import crypto from 'node:crypto';

export class Professor {
  constructor(
    public name: string,
    public surname: string,
    public mail: string,
    public profile_picture: string,
    public state: string,
    public id = crypto.randomUUID()
  ) {}
}