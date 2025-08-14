import * as v from 'valibot';

export const CreateAppealSchema = v.object({
  text: v.pipe(
    v.string('El texto de la apelación debe ser un string.'),
    v.minLength(10, 'La apelación debe tener al menos 10 caracteres.')
  ),

  student: v.pipe(
    v.string('El ID del estudiante es requerido.'),
    v.minLength(1, 'El ID del estudiante no puede estar vacío.')
  ),
});

export const UpdateAppealSchema = v.object({
  state: v.pipe(
    v.string('El estado debe ser un string.'),
    v.picklist(
      ['accepted', 'rejected'],
      "El estado solo puede ser 'accepted' o 'rejected'."
    )
  ),
});

export type CreateAppealType = v.InferOutput<typeof CreateAppealSchema>;
export type UpdateAppealType = v.InferOutput<typeof UpdateAppealSchema>;