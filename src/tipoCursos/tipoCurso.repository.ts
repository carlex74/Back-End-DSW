import { Repository } from "../shared/repository.js";
import { TipoCurso } from "./tipoCurso.entity.js";

const tipoCursos = [
  new TipoCurso("Java", "Papapapapapa", "a02b91bc-3769-4221-beb1-d7a3aeba7dad"),
];

export class  TipoCursoRepository implements Repository<TipoCurso> {

  findAll(): TipoCurso[] | undefined {
    return tipoCursos;
  }

  findOne(item: { id: string }): TipoCurso | undefined {
    return tipoCursos.find((tipoCurso) => tipoCurso.id === item.id);
  }

  add(item: TipoCurso): TipoCurso | undefined {
    tipoCursos.push(item);
    return item;
  }

  update(item: TipoCurso): TipoCurso | undefined {
    const index = tipoCursos.findIndex((tipoCurso) => tipoCurso.id === item.id);
    if (index !== -1) {
      tipoCursos[index] = {...tipoCursos[index],...item};
    }
    return tipoCursos[index];
  }

  delete(item: { id: string }): TipoCurso | undefined {
    const index = tipoCursos.findIndex((tipoCurso) => tipoCurso.id === item.id);
    if (index !== -1) {
      const deleteTipoCursos = tipoCursos[index]
      tipoCursos.splice(index)
      return deleteTipoCursos;
    }
  }
}