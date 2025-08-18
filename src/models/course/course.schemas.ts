import * as v from 'valibot';

//Scheme for creation
export const CreateCourseSchema = v.object({
  name: v.pipe(
    v.string('El nombre debe ser un texto.'),
    v.minLength(1, 'El nombre no puede estar vacío.')
  ),
  description: v.pipe(
    v.string('La descripción debe ser un texto.'),
    v.minLength(1, 'La descripción no puede estar vacía.')
  ),
  //In an optional field, v.pipe is inside v.optional
  password: v.optional(v.pipe(v.string())),

  courseTypeId: v.pipe(
    v.string(),
    v.uuid('El ID del tipo de curso debe ser un UUID válido.')
  ),
});

//Scheme for update of a course
// v.partial() allows us to create a schema where all fields are optional.
export const UpdateCourseSchema = v.partial(CreateCourseSchema);

//Infer the TypeScript types from the schemas. We use this to ensure that the TypeScript types match the validation schemas.
export type CreateCourseType = v.InferOutput<typeof CreateCourseSchema>;
export type UpdateCourseType = v.InferOutput<typeof UpdateCourseSchema>;
