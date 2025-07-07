import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';
import { Institution } from '../institution/institution.entity.js';

@Entity()
export class Professor extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  surname!: string;

  @Property({ nullable: false })
  mail!: string;

  @Property({ nullable: true })
  profile_picture!: string;

  @Property({ nullable: false })
  state!: string;

  @OneToMany(() => Course, (course) => course.professor, {
    cascade: [Cascade.ALL],
  })
  courses = new Collection<Course>(this);

  @ManyToOne(() => Institution, { nullable: true })
  institution?: Rel<Institution>;
}
