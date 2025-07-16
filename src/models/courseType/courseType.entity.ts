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
  // La propiedad no puede ser nula y no pueden haber dos CourseTypes con el mismo nombre
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property({ nullable: false })
  description!: string;

  //Indica que es una relación uno a muchos con la entidad Course
  //Especificamos como debe interpretar la relación
  //Cascade.ALL indica que todas las operaciones de cascada se aplicarán a los cursos relacionados
  @OneToMany(() => Course, (course) => course.courseType, {
    cascade: [Cascade.ALL],
  })
  courses = new Collection<Course>(this);
}
