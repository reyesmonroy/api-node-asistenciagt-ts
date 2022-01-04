import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {
    try {
        const users = await User.findAll({
            where: {
                status: 'ACTIVO'
            }
        });
        res.status(200).json({
            data: users,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
}

export const createUser = async ( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;

        const existeEmail = await User.findOne({
            where: {
                email: email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                error: 'Ya existe un Usuario con el mismo email' + email
            });
        }

        const salt = bcrypt.genSaltSync();

        req.body.password = bcrypt.hashSync( password, salt);

        const user = await User.create(req.body);

        res.status(201).json({
            data: user,
            code: 201
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el usuario.'
        });
        console.log(error);
    }
}

export const updateUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }

        if ( password ) {
            // Encriptar la contraseña
            const salt = bcrypt.genSaltSync();
            req.body.password = bcrypt.hashSync( password, salt);
        }

        await user?.update(req.body);

        res.status(200).json({
            data: user,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el usuario.'
        });
        console.log(error);
    }
}

export const deleteUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }

        await user?.update({status: status});

        res.status(200).json({
            data: user,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el usuario.'
        });
        console.log(error);
    }
}

export const activateUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }

        await user?.update({status: status});

        res.status(200).json({
            data: user,
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el usuario.'
        });
        console.log(error);
    }
}