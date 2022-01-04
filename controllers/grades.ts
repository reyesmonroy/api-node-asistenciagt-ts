import { Request, Response } from 'express';

import Grade from '../models/grade';
import GradeSelect from '../models/gradeSelect';
import GradeUser from '../models/gradeUser';

export const getGrades = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.body;

        const grades = await Grade.findAll({
            include: {
                model: GradeUser,
                required: true,
                as: 'GradeUser',
                where: {
                    id_user: id
                }
            }
        });
        res.status(200).json({
            data: grades,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
}

export const getGradesSelect = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.body;

        const grades = await GradeSelect.findAll({
            where: {
                id_user: id
            }
        });
        res.status(200).json({
            data: grades,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
}

export const createGrade = async ( req: Request, res: Response ) => {
    try {

        const grade = await <any>Grade.create(req.body);

        const gradeUser = await GradeUser.create({
            id_grade: grade.id,
            id_user: req.body.userId,
            permission: 'PROPIETARIO'
        });

        res.status(201).json({
            data: grade,
            code: 201
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el Grado.'
        });
        console.log(error);
    }
}

export const updateGrade = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        const grade = await Grade.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe un Grado con el id ${id}`
            });
        }

        await grade?.update(req.body);

        res.status(200).json({
            data: grade,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el grado.'
        });
        console.log(error);
    }
}

export const deleteGrade = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const grade = await Grade.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe el Grado con el id ${id}`
            });
        }

        await grade?.update({status: status});

        res.status(200).json({
            data: grade,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el Grado.'
        });
        console.log(error);
    }
}

export const activateGrade = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const grade = await Grade.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe el Grado con el id ${id}`
            });
        }

        await grade?.update({status: status});

        res.status(200).json({
            data: grade,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el Grado.'
        });
        console.log(error);
    }
}