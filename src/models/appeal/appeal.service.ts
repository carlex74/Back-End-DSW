import { EntityManager } from '@mikro-orm/core';
import { Appeal } from './appeal.entity.js';
import { CreateAppealType } from './appeal.schemas.js';
import { User } from '../user/user.entity.js';

export class AppealService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  public async create(
    appealInput: CreateAppealType,
    userId: string,
    cvPath?: string
  ): Promise<Appeal> {
    const appeal = this.em.create(Appeal, {
      ...appealInput,
      date: new Date(),
      state: 'pending',
      user: this.em.getReference(User, userId),
      cvPath: cvPath,
    });

    await this.em.flush();

    return appeal;
  }

  public async findAll(): Promise<Appeal[]> {
    return this.em.find(Appeal, {}, { populate: ['user'] });
  }

  public async findOne(id: string): Promise<Appeal | null> {
    return this.em.findOne(Appeal, { id }, { populate: ['user'] });
  }

  public async update(
    id: string,
    appealData: Partial<Appeal>
  ): Promise<Appeal> {
    const appeal = await this.em.findOneOrFail(Appeal, { id });
    this.em.assign(appeal, appealData);
    await this.em.flush();
    return appeal;
  }

  public async remove(id: string): Promise<void> {
    const appeal = this.em.getReference(Appeal, id);
    await this.em.removeAndFlush(appeal);
  }
}
