import {
  Entity,
  Cascade,
  Collection,
  ManyToMany,
  Rel,
  OneToOne,
} from '@mikro-orm/core';
import { Course } from '../course/course.entity.js';
import { User } from '../user/user.entity.js'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';

@Entity()
export class Student extends BaseEntity {

  @OneToOne(() => User, (user) => user.studentProfile, { nullable: false })
  user!: Rel<User>;

  @ManyToMany(() => Course, (course) => course.students, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  courses = new Collection<Course>(this);
}
