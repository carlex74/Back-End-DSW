import { Repository } from '../shared/repository.js';
import { Professor } from './professor.entity.js';

const professors = [
  new Professor(
    'Miguel',
    'Del Brio',
    'miguelbrio@gmail.com',
    'noPhoto',
    'accepted',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dac'
  ),
];

export class ProfessorRepository implements Repository<Professor> {
  public findAll(): Professor[] | undefined {
    return professors;
  }

  public findOne(item: { id: string }): Professor | undefined {
    return professors.find((professor) => professor.id === item.id);
  }

  public add(item: Professor): Professor | undefined {
    professors.push(item);
    return item;
  }

  public update(item: Professor): Professor | undefined {
    const index = professors.findIndex((professor) => professor.id === item.id);
    if (index !== -1) {
      professors[index] = { ...professors[index], ...item };
    }
    return professors[index];
  }

  public delete(item: { id: string }): Professor | undefined {
    const index = professors.findIndex((professor) => professor.id === item.id);
    if (index !== -1) {
      const deleteProfessor = professors[index];
      professors.splice(index, 1);
      return deleteProfessor;
    }
  }
}
