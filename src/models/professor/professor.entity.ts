import {
  Entity,
  OneToMany,
  Property,
  Collection,
  ManyToOne,
  Rel,
  OneToOne,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';
import { Institution } from '../institution/institution.entity.js';
import { User } from '../user/user.entity.js';
@Entity()
export class Professor extends BaseEntity {
  @OneToOne(() => User, (user) => user.professorProfile, { nullable: false })
  user!: Rel<User>;

  @Property({ nullable: false, default: 'pending' })
  state!: string;

  @OneToMany(() => Course, (course) => course.professor)
  courses = new Collection<Course>(this);

  @ManyToOne(() => Institution, { nullable: true })
  institution?: Rel<Institution>;
}
