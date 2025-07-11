import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Professor } from '../professor/professor.entity.js';

@Entity()
export class Appeal extends BaseEntity {
  @Property({ nullable: false })
  date!: Date;

  @Property({ nullable: false })
  text!: string;

  @Property({ nullable: false, default: 'pending' })
  state!: string;

  @ManyToOne(() => Professor, { nullable: false })
  professor!: Rel<Professor>;
}
