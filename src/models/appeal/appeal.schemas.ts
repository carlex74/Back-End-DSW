import * as v from 'valibot';

export const CreateAppealSchema = v.object({
  expertise: v.pipe(
    v.string('El área de especialización debe ser un texto.'),
    v.minLength(1, 'El área de especialización no puede estar vacía.')
  ),
  experienceMotivation: v.pipe(
    v.string('La experiencia y motivación debe ser un texto.'),
    v.minLength(
      20,
      'Por favor, detalla tu experiencia en al menos 20 caracteres.'
    )
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