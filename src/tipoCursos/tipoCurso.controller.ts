import { TipoCursoRepository } from "./tipoCurso.repository.js";
import { TipoCurso } from "./tipoCurso.entity.js";
import { NextFunction, Request, Response } from "express";


const repository= new TipoCursoRepository();

const sanitizedTipoCursoInput = (req: Request, res:Response, next:NextFunction) => {
    req.body.sanitizedInput = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    }

    Object.keys(req.body.sanitizedInput).forEach((key)=>{
      if (req.body.sanitizedInput[key] === undefined){
        delete req.body.sanitizedInput[key]
      }
    })
    next()
}


const findAll = (req: Request, res: Response) => {

    res.json({
        data:repository.findAll()
    });

}

const findOne = (req: Request, res: Response) => {
  
    const { id } = req.params;

    const tipoCurso= repository.findOne({id})

    if(!tipoCurso){
        
        return res.status(404).json({
            message: `TipoCurso con este id ${id} no encontrado`
        });
    }

    res.json({
        data: tipoCurso
    });
}


const  add = (req: Request, res: Response) => {

    const { sanitizedInput } = req.body;

    const tipoCurso = new TipoCurso(sanitizedInput.nombre, sanitizedInput.descripcion);

    const newTipoCurso = repository.add(tipoCurso);

    res.status(201).json({
        data: newTipoCurso
    });
}


const update = (req: Request, res: Response) => {
    const { id } = req.params;
    
    req.body.sanitizedInput.id = req.params.id;
    
    const updatedTipoCurso = repository.update(req.body.sanitizedInput);

    console.log(req.body.sanitizedInput);

    if (!updatedTipoCurso) {
        return res.status(404).json({
            message: `TipoCurso con este id ${id} no encontrado`
        });
    }

    res.status(200).json({
        data: updatedTipoCurso
    });

}

const remove = (req: Request, res: Response) => {
  const id = req.params.id;
  const tipoCurso = repository.delete({ id });

  if (!tipoCurso) {
    res.status(404).send({ message: "Character not found" });
  } else {
    res.status(200).send({ message: "Character deleted successfully" });
  }

}


export {sanitizedTipoCursoInput, findAll, findOne, add, update, remove}