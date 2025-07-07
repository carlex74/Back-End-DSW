import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Professor } from '../professor/professor.entity.js';

@Entity()
export class Institution extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  description!: string;

  @OneToMany(() => Professor, (professor) => professor.institution, {
    cascade: [Cascade.ALL],
  })
  professors = new Collection<Professor>(this);
}
