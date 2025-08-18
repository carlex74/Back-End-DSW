import {
  Entity,
  Property,
  ManyToOne,
  Rel,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { CourseType } from '../courseType/courseType.entity.js';
import { Professor } from '../professor/professor.entity.js';
import { Student } from '../student/student.entity.js';

/**
 * Represents a course entity.
 *
 * Properties
 * @class Course
 * @property {string} name - The name of the course.
 * @property {string} description - A brief description of the course.
 * @property {string} [password] - An optional password for the course.
 * @property {CourseType} courseType - The type of the course
 * @property {string} id - A unique identifier for the course, generated using crypto.
 */

@Entity()
export class Course extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  description!: string;

  @Property({ nullable: true })
  password?: string;

  @ManyToOne(() => CourseType, { nullable: false })
  courseType!: Rel<CourseType>;

  @ManyToOne(() => Professor, { nullable: false })
  professor!: Rel<Professor>;

  @ManyToMany(() => Student, (student) => student.courses)
  students = new Collection<Student>(this);
}
