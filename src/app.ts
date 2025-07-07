import express from 'express';
import { courseTypeRouter } from './models/courseType/courseType.routes.js';
import { institutionRouter } from './models/institution/institution.routes.js';
import { studentRouter } from './models/student/student.routes.js';
import { professorRouter } from './models/professor/professor.routes.js';
import { courseRouter } from './models/course/course.routes.js';
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.use('/api/courseTypes', courseTypeRouter);
app.use('/api/institutions', institutionRouter);
app.use('/api/students', studentRouter);
app.use('/api/professors', professorRouter);
app.use('/api/courses', courseRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
