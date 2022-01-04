import { Request, Response } from 'express';

import Course from '../models/course';
import GradeCourse from '../models/gradeCourse';

export const getCourses = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.body;

        const courses = await GradeCourse.findAll({
            where: {
                id_user: id
            }
        });
        res.status(200).json({
            data: courses,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
}

export const createCourse = async ( req: Request, res: Response ) => {
    try {

        const course = await <any>Course.create(req.body);

        res.status(201).json({
            data: course,
            code: 201
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el Curso.'
        });
        console.log(error);
    }
}

export const updateCourse= async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe un Curso con el id ${id}`
            });
        }

        await course?.update(req.body);

        res.status(200).json({
            data: course,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el Curso.'
        });
        console.log(error);
    }
}

export const deleteCourse = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const course = await Course.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe el Curso con el id ${id}`
            });
        }

        await course?.update({status: status});

        res.status(200).json({
            data: course,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el Curso.'
        });
        console.log(error);
    }
}

export const activateCourse = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const course = await Course.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe el Curso con el id ${id}`
            });
        }

        await course?.update({status: status});

        res.status(200).json({
            data: course,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el Curso.'
        });
        console.log(error);
    }
}