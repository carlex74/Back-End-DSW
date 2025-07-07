/*import { orm } from '../../shared/db/orm.js';
import { Student } from './student.entity.js';
import { Request, Response, NextFunction } from 'express';
import {
  CreateStudentDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dtos/index.js';

const em = orm.em;

function sanitizeStudentInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    profile_picture: req.body.profile_picture,
    courses: req.body.courses,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const students = await em.find(
      Student,
      {},
      {
        populate: ['coursesIds'],
      }
    );
    res.status(200).json({ message: 'Found all student', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const students = await em.findOneOrFail(
      Student,
      { id },
      {
        populate: ['coursesIds'],
      }
    );
    res.status(200).json({ message: 'Found student', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {

    const { dto: createStudentDto, errors } = CreateStudentDto.fromRequest(
      req.body
    )

    if (errors) {
      return res.status(400).json({ message: 'Validation failed', errors }); // Implement formatValiError
    }

    if(!createStudentDto) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const students = em.create(Student, {
      name: createStudentDto.name,
      surname: createStudentDto.surname,
      mail: createStudentDto.mail,
      profile_picture: createStudentDto.profile_picture,
      coursesIds: createStudentDto.coursesIds ? createStudentDto.coursesIds : [],
    });

    if (createStudentDto.coursesIds && createStudentDto.coursesIds.length > 0) {
      const courses = await em.find(Course, {
        id: { $in: createStudentDto.coursesIds },
      });

      // Validar que todos los cursos existan
      if (courses.length !== createStudentDto.coursesIds.length) {
        const foundIds = courses.map((course) => course.id);
        const missingIds = createStudentDto.coursesIds.filter(
          (id) => !foundIds.includes(id)
        );
        return res.status(400).json({
          message: 'Some courses were not found',
          errors: [`Courses not found: ${missingIds.join(', ')}`],
        });
      }

      student.courses.set(courses);
    }
    await em.flush();
    res.status(201).json({ message: 'Student created', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const studentToUpdate = await em.findOneOrFail(Student, id);
    em.assign(studentToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Student updated', data: studentToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const students = em.getReference(Student, id);
    await em.removeAndFlush(students);
    res.status(200).send({ message: 'Student deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeStudentInput, findAll, findOne, add, remove, update };
*/
