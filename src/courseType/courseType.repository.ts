import { Repository } from '../shared/repository.js';
import { CourseType } from './courseType.entity.js';

const courseTypes = [
  new CourseType(
    'Java',
    'Curso de Java',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
];

export class CourseTypeRepository implements Repository<CourseType> {
  public findAll(): CourseType[] | undefined {
    return courseTypes;
  }

  public findOne(item: { id: string }): CourseType | undefined {
    return courseTypes.find((courseType) => courseType.id === item.id);
  }

  public add(item: CourseType): CourseType | undefined {
    courseTypes.push(item);
    return item;
  }

  public update(item: CourseType): CourseType | undefined {
    const index = courseTypes.findIndex(
      (courseType) => courseType.id === item.id
    );
    if (index !== -1) {
      courseTypes[index] = { ...courseTypes[index], ...item };
    }
    return courseTypes[index];
  }

  public delete(item: { id: string }): CourseType | undefined {
    const index = courseTypes.findIndex(
      (courseType) => courseType.id === item.id
    );
    if (index !== -1) {
      const deletedCourseType = courseTypes[index];
      courseTypes.splice(index, 1);
      return deletedCourseType;
    }
  }
}
