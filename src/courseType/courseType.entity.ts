import crypto from 'node:crypto';

export class CourseType {
  constructor(
    public name: string,
    public description: string,
    public id = crypto.randomUUID()
  ) {}
}
