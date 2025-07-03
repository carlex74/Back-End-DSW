import { Repository } from '../shared/repository'
import { Institution } from './institution.entity.js'

const institutions = [
  new Institution(
    'UTN frro',
    'Universidad Tecnológica Nacional - Facultad Regional Rosario',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]

export class InstitutionRepository implements Repository<Institution> {
  public findAll(): Institution[] | undefined {
    return institutions
  }

  public findOne(item: { id: string }): Institution | undefined {
    return institutions.find((institution) => institution.id === item.id)
  }

  public add(item: Institution): Institution | undefined {
    institutions.push(item)
    return item
  }

  public update(item: Institution): Institution | undefined {
    const index = institutions.findIndex(
      (institution) => institution.id === item.id
    )

    if (index !== -1) {
      institutions[index] = { ...institutions[index], ...item }
    }
    return institutions[index]
  }

  public delete(item: { id: string }): Institution | undefined {
    const index = institutions.findIndex(
      (institution) => institution.id === item.id
    )

    if (index !== -1) {
      const deletedInstitution = institutions[index]
      institutions.splice(index, 1)
      return deletedInstitution
    }
  }
}
