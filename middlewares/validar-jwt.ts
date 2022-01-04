import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const validarJWT = async ( req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid
        const user = await User.findByPk( id );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( user.status != 'ACTIVO' ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario se encuentra INACTIVO'
            })
        }
        
        req.usuario = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}