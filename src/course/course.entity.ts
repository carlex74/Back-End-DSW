import crypto from 'node:crypto';
import { CourseType } from '../courseType/courseType.entity.js';

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

export class Course{

    constructor(
        public name: string,
        public description: string,
        public password?: string,
        public courseType : CourseType = new CourseType("Default Course Type", "Default Description"),
        public id = crypto.randomUUID()
        
    ){

    }
}