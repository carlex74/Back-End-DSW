import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { User } from '../user/user.entity.js';

/**
 * Para que un estudiante pase a ser profesor
 */
@Entity()
export class Appeal extends BaseEntity {
  @Property({ nullable: false })
  date!: Date;

  @Property({ nullable: false, default: 'pending' })
  state!: string;

  @Property({ nullable: false })
  expertise!: string;

  @Property({ type: 'text', nullable: false })
  experienceMotivation!: string;

  @Property({ nullable: true })
  cvPath?: string;

  @ManyToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
