import { EntityManager } from '@mikro-orm/core';
import { Course } from './course.entity.js';

export class CourseService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  public async create(courseData: any): Promise<Course> {
    const course = this.em.create(Course, courseData);
    await this.em.flush();
    return course;
  }

  public async findAll(): Promise<Course[]> {
    return this.em.find(
      Course,
      {},
      {
        populate: ['courseType', 'professor', 'students'],
      }
    );
  }

  public async findOne(id: string): Promise<Course> {
    return this.em.findOneOrFail(
      Course,
      { id },
      {
        populate: ['courseType', 'professor', 'students'],
      }
    );
  }

  public async update(
    id: string,
    courseData: Partial<Course>
  ): Promise<Course> {
    const course = await this.em.findOneOrFail(Course, { id });
    this.em.assign(course, courseData);
    await this.em.flush();
    return course;
  }

  public async remove(id: string): Promise<Course> {
    const course = this.em.getReference(Course, id);
    await this.em.removeAndFlush(course);

    return course;
  }
}
