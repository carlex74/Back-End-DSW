import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Professor } from '../professor/professor.entity.js';
import { User } from '../user/user.entity.js';
import { Student } from '../student/student.entity.js';

/**
 * Para que un estudiante pase a ser profesor
 */
@Entity()
export class Appeal extends BaseEntity {
  @Property({ nullable: false })
  date!: Date;

  @Property({ nullable: false })
  text!: string;

  @Property({ nullable: false, default: 'pending' })
  state!: string;

  @ManyToOne(() => Student, { nullable: false })
  student!: Rel<Student>;

  @ManyToOne(() => User, { nullable: true })
  user?: Rel<User>;
}
