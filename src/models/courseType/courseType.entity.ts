import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';

@Entity()
export class CourseType extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property({ nullable: false })
  description!: string;

  @OneToMany(() => Course, (course) => course.courseType, {
    cascade: [Cascade.ALL],
  })
  courses = new Collection<Course>(this);
}
