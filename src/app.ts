import express from 'express'
import { courseTypeRouter } from './models/courseType/courseType.routes.js'
import { institutionRouter } from './models/institution/institution.routes.js'
import { studentRouter } from './models/student/student.routes.js'
import { professorRouter } from './models/professor/professor.routes.js'
import { courseRouter } from './models/course/course.routes.js'
import { appealRouter } from './models/appeal/appeal.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { authRouter } from './auth/auth.routes.js'
import cors from 'cors';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  RequestContext.create(orm.em, next); //em is the EntityManager
});

app.use('/api/courseTypes', courseTypeRouter)
app.use('/api/institutions', institutionRouter)
app.use('/api/students', studentRouter)
app.use('/api/professors', professorRouter)
app.use('/api/courses', courseRouter)
app.use('/api/appeals', appealRouter)
app.use('/api/auth', authRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

// Never in production
await syncSchema();// Ensure the database schema is in sync before starting the server 


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
