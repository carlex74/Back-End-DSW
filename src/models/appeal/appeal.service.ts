import { EntityManager } from '@mikro-orm/core';
import { Appeal } from './appeal.entity.js';

export class AppealService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  public async create(appealData: any): Promise<Appeal> {
    const appeal = this.em.create(Appeal, appealData);
    await this.em.flush();
    return appeal;
  }

  public async findAll(): Promise<Appeal[]> {
    return this.em.find(
      Appeal,
      {},
      {
        populate: ['student'],
      }
    );
  }

  public async findOne(id: string): Promise<Appeal> {
    return this.em.findOneOrFail(
      Appeal,
      { id },
      {
        populate: ['student'],
      }
    );
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