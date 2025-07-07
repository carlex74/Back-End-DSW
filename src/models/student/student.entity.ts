import {
  Entity,
  Property,
  Cascade,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';

@Entity()
export class Student extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  surname!: string;

  @Property({ nullable: false })
  mail!: string;

  @Property({ nullable: true })
  profile_picture?: string;

  @ManyToMany(() => Course, (course) => course.students, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  courses = new Collection<Course>(this);
}
