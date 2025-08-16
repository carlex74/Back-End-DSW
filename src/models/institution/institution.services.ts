import { EntityManager } from '@mikro-orm/core';
import { Institution } from "./institution.entity.js";

export class InstitutionService {

    private em: EntityManager;
    
    constructor(em: EntityManager) {
        this.em = em;
    }
    
    public async create(institutionData: any): Promise<Institution> {
        const institution = this.em.create(Institution, institutionData);
        await this.em.flush();
        return institution;
    }
    
    public async findAll(): Promise<Institution[]> {
        return this.em.find(Institution, {}, { populate: ['professors'] });
    }
    
    public async findOne(id: string): Promise<Institution> {
        return this.em.findOneOrFail(Institution, { id }, { populate: ['professors'] });
    }
    
    public async update(id: string, institutionData: Partial<Institution>): Promise<Institution> {
        const institution = await this.em.findOneOrFail(Institution, { id });
        this.em.assign(institution, institutionData);
        await this.em.flush();
        return institution;
    }
    
    public async remove(id: string): Promise<Institution> {
        const institution = this.em.getReference(Institution, id);
        await this.em.removeAndFlush(institution);
        return institution;
    }

}