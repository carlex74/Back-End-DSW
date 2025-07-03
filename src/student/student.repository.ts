import { Repository } from '../shared/repository.js'
import { Student } from './student.entity.js'

const students = [
  new Student(
    'Franco',
    'Zariaga',
    'francozariaga.zariaga@gmail.com',
    'noPhoto',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]

export class StudentRepository implements Repository<Student> {
  public findAll(): Student[] | undefined {
    return students
  }

  public findOne(item: { id: string }): Student | undefined {
    return students.find((student) => student.id === item.id)
  }

  public add(item: Student): Student | undefined {
    students.push(item)
    return item
  }

  public update(item: Student): Student | undefined {
    const index = students.findIndex(
      (student) => student.id === item.id
    )
    if (index !== -1) {
      students[index] = { ...students[index], ...item }
    }
    return students[index]
  }

  public delete(item: { id: string }): Student | undefined {
    const index = students.findIndex((student) => student.id === item.id)
    if (index !== -1) {
      const deleteStudent = students[index]
      students.splice(index, 1)
      return deleteStudent
    }
  }
}
