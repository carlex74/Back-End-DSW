import { CourseType } from "../courseType/courseType.entity.js";
import { Repository } from "../shared/repository.js";
import { Course } from "./course.entity.js";


const courses = [
    new Course("Java","Curso de Java", "hyperSecretPassword"),
]

/**
 * Represents a repository for managing courses.
 * Implements the Repository interface for CRUD operations on Course entities.
 * 
 * @class CourseRepository
 * @implements {Repository<Course>}
 */
export class CourseRepository implements Repository<Course>{

    public findAll(): Course[] | undefined {
        return courses;
    }
    public findOne(item: { id: string; }): Course | undefined {
        return courses.find((course)=>course.id===item.id)
    }
    public add(item: Course): Course | undefined {
        courses.push(item)
        return item
    }
    public update(item: Course): Course | undefined {
        const index=courses.findIndex((course)=>course.id===item.id)
        if(index!==-1){
            courses[index]={...courses[index],...item}
        }
        return courses[index]
    }
    public delete(item: { id: string; }): Course | undefined {
        const index=courses.findIndex((course)=>course.id===item.id)
        if(index!==-1){
            const deletedCourse=courses[index]
            courses.splice(index,1)
            return deletedCourse
        }
    }
}