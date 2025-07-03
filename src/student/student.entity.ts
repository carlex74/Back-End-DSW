import crypto from 'node:crypto';

export class Student {
  constructor(
    public name: string,
    public surname: string,
    public mail: string,
    public profile_picture: string,
    public id = crypto.randomUUID()
  ) {}
}
