import * as v from 'valibot';

// Used to validate data when creating a student
export const CreateStudentSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'El nombre es requerido.')),
  surname: v.pipe(v.string(), v.minLength(1, 'El apellido es requerido.')),
  mail: v.pipe(v.string(), v.email('El formato del email no es válido.')),
  password_plaintext: v.pipe(
    v.string(),
    v.minLength(8, 'La contraseña debe tener al menos 8 caracteres.')
  ),
});

// Used to validate data when updating a student
export const UpdateStudentSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.minLength(1, 'El nombre es requerido.')),
    surname: v.pipe(v.string(), v.minLength(1, 'El apellido es requerido.')),
  })
);

export type CreateStudentType = v.InferOutput<typeof CreateStudentSchema>;
export type UpdateStudentType = v.InferOutput<typeof UpdateStudentSchema>;
