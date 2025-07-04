import { NextFunction, Request, Response } from "express";
import { CourseRepository } from "./course.repository.js";
import { CourseTypeRepository} from "../courseType/courseType.repository.js"
import { Course } from "./course.entity.js";


const repository= new CourseRepository();
const courseTypeRepository = new CourseTypeRepository();

const sanitizedCourseInput=(
    req: Request,
    res: Response,
    next: NextFunction
)=>{

    req.body.sanitizedInput={
        name: req.body.name,
        description: req.body.description,
        password: req.body.password,
        courseTypeId: req.body.courseTypeId
    }

    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next();     

}


const findAll = (req: Request, res: Response) => {
    res.json({
        data: repository.findAll()
    })
}


const findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    const course = repository.findOne({ id });

    if (!course) {
        return res.status(404).json({
            message: `Curso con este id ${id} no encontrado`
        });
    }

    res.json({
        data: course
    });
}

const add = (req: Request, res: Response) => {
    const { sanitizedInput } = req.body;

    // Sale si no existe el campo couseTypeId en el body
    if (!sanitizedInput.courseTypeId) {
        return res.status(400).json({
            message: "courseTypeId es requerido"
        });
    }

    // Sale si no se encuentra dicho tipo de curso
    const courseType = courseTypeRepository.findOne({ id: sanitizedInput.courseTypeId });
    if (!courseType) {
        return res.status(404).json({
            message: `CourseType con id ${sanitizedInput.courseTypeId} no encontrado`
        });
    }

    const course = new Course(
        sanitizedInput.name,
        sanitizedInput.description,
        sanitizedInput.password,
        courseType
    );

    const addedCourse = repository.add(course);
    res.status(201).json({
        data: addedCourse
    });
};

const update = (req: Request, res: Response) => {
    const { id } = req.params

    req.body.sanitizedInput.id = req.params.id

    const updatedCourse = repository.update(req.body.sanitizedInput)

    console.log(req.body.sanitizedInput)

    if(!updatedCourse) {
        return res.status(404).json({
            message: `Curso con el id ${id} no encontrado`
        })
    }

    res.status(200).json({
        data: updatedCourse,
    })
}


const remove = (req: Request, res: Response) => {
    const { id } = req.params;

    const course = repository.delete({ id });

    if (!course) {
        return res.status(404).json({
            message: `Curso con este id ${id} no encontrado`
        });
    }

    res.status(201).json({
        data: course
    });
}

export { sanitizedCourseInput, findAll, findOne, add, update, remove }