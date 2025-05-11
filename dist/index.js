import express from 'express';
import { tipoCursoRouter } from './tipoCursos/tipoCurso.routes.js';
const app = express();
app.use(express.json());
app.use('/api/tipoCursos', tipoCursoRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=index.js.map