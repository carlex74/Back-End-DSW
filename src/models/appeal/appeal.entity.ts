import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { User } from '../user/user.entity.js';

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
  documentUrl?: string;
  
  @ManyToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
