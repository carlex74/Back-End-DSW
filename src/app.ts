import express from 'express';
import { courseTypeRouter } from './courseType/courseType.routes.js';
import { institutionRouter } from './institution/institution.routes.js';
import { studentRouter } from './student/student.routes.js';
import { professorRouter } from './professor/professor.routes.js';
import { courseRouter } from './course/course.routes.js';

const app = express();
app.use(express.json());

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
