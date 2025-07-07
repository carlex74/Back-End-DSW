export class StudentResponseDto {
  id!: string;
  name!: string;
  surname!: string;
  mail!: string;
  profile_picture?: string;
  courses?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
}
