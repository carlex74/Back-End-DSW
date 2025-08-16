import { EntityManager } from '@mikro-orm/core';
import { CourseType } from './courseType.entity.js';


export class CourseTypeService {

    private em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    public async create(courseTypeData: any): Promise<CourseType>{

        const courseType = this.em.create(CourseType, courseTypeData);
        await this.em.flush();
        return courseType;
    }

    public async update(id:string, courseTypeData: Partial<CourseType>): Promise<CourseType>{
        const courseType = await this.em.findOneOrFail(CourseType, { id });
        this.em.assign(courseType, courseTypeData);
        await this.em.flush();
        return courseType;
    }

    public async remove(id: string): Promise<CourseType> {
        const courseType = this.em.getReference(CourseType, id);
        await this.em.removeAndFlush(courseType);
        return courseType;
    }

    public async findAll(): Promise<CourseType[]> {
        return this.em.find(CourseType, {},{populate: ['courses']});
    }

    public async findOne(id: string): Promise<CourseType> {
        return this.em.findOneOrFail(CourseType, { id });
    }

}