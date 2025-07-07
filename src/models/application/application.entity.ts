import {
  Entity,
  Property,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Professor } from '../professor/professor.entity.js';

/**
 * Represents a course entity.
 *
 * Properties
 * @class Course
 * @property {string} date - The date of the application.
 * @property {string} text - A brief description of the course.
 * @property {string} id - A unique identifier for the course, generated using crypto.
 */

@Entity()
export class Application extends BaseEntity {
  @Property({ nullable: false })
  date!: Date;

  @Property({ nullable: false })
  text!: string;

  @ManyToOne(() => Professor, { nullable: false })
  professor!: Rel<Professor>;
}
