import * as v from 'valibot';

// CreateStudentSchema defines the validation schema for creating a student
const CreateStudentSchema = v.object({
  name: v.pipe(
    v.string('Name must be a string'),
    v.trim(),
    v.nonEmpty('Name is required'),
    v.minLength(1, 'Name must be at least 1 character long'),
    v.maxLength(50, 'Name must be at most 50 characters long')
  ),

  surname: v.pipe(
    v.string('Surname must be a string'),
    v.trim(),
    v.nonEmpty('Surname is required'),
    v.minLength(1, 'Surame must be at least 1 character'),
    v.minLength(1, 'Surame cannot exceed 50 character')
  ),

  mail: v.pipe(
    v.string('Mail must be a string'),
    v.trim(),
    v.nonEmpty('Mail is required'),
    v.email('Invalid email format'),
    v.toLowerCase()
  ),

  profile_picture: v.optional(
    v.pipe(
      v.string('Profile picture must be a string'), //Check it
      v.trim(),
      v.url('Profile picture must be a valid URL')
    )
  ),

  coursesIds: v.optional(
    v.array(v.pipe(v.string('Course ID must be a stringC'), v.trim()))
  ),
});

// CreateStudentDto is the Data Transfer Object for creating a student
export class CreateStudentDto {
  name!: string;
  surname!: string;
  mail!: string;
  profile_picture?: string;
  coursesIds?: string[];

  // Constructor to initialize the DTO with validated data
  constructor(data: v.InferInput<typeof CreateStudentSchema>) {
    Object.assign(this, data);
  }

  // fromRequest method validates the request body and returns a DTO or errors
  static fromRequest(body: any): {
    dto?: CreateStudentDto;
    errors?: v.ValiError<typeof CreateStudentSchema>;
  } {
    try {
      const validatedData = v.parse(CreateStudentSchema, body);
      return { dto: new CreateStudentDto(validatedData) };
    } catch (error) {
      if (error instanceof v.ValiError) {
        return { errors: error };
      }
      throw error;
    }
  }

  validate(): {
    isValid: boolean;
    errors?: v.ValiError<typeof CreateStudentSchema>;
  } {
    try {
      v.parse(CreateStudentSchema, this);
      return { isValid: true };
    } catch (error) {
      if (error instanceof v.ValiError) {
        return { isValid: false, errors: error };
      }
      throw error;
    }
  }
}
