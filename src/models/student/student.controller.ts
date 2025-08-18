import { Request, Response } from 'express';
import { orm } from '../../shared/db/orm.js';
import { StudentService } from './student.services.js';
import { HttpResponse } from '../../shared/response/http.response.js';

// NOTE: The 'add' function for creating a Student directly is problematic
// because student profiles should be linked to User registration.
// This function is kept for now to finish the refactor, but may be removed or redesigned.
async function add(req: Request, res: Response) {
  try {
  // 1. Isolated service instance
  const studentService = new StudentService(orm.em.fork());
    
  // 2. Business logic (still to be fully defined)
  // Assuming req.body contains { user: 'userId' } as defined in the schema
  const newStudent = await studentService.create(req.body);

  // 3. Standardized response
  return HttpResponse.Created(res, newStudent);
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const studentService = new StudentService(orm.em.fork());
    const students = await studentService.findAll();
    return HttpResponse.Ok(res, students);
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const studentService = new StudentService(orm.em.fork());
    const id = req.params.id;
    const student = await studentService.findOne(id);

    if (!student) {
      return HttpResponse.NotFound(res, 'Student not found');
    }
    return HttpResponse.Ok(res, student);
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

async function update(req: Request, res: Response) {
  try {
    const studentService = new StudentService(orm.em.fork());
    const id = req.params.id;
    
    const updatedStudent = await studentService.update(id, req.body);
    
    return HttpResponse.Ok(res, updatedStudent);
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const studentService = new StudentService(orm.em.fork());
    const id = req.params.id;
    await studentService.remove(id);
    return HttpResponse.Ok(res, { message: 'Student deleted successfully' });
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

export { findAll, findOne, add, update, remove };