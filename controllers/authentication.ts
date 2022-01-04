import { generarJWT } from './../helpers/generarJWT';
import { googleVerify } from './../helpers/google-verify';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';


export const login = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne<any>({
            where: {
                email: email
            }
        });

        if ( !user ) {
            return res.status(400).json({
                data: user,
                errors: 'No existe usuario con el correo proporcionado.',
                code: 200
            });
        }

        // Verificar si el uid tiene estado ACTIVO
        if ( user.status != 'ACTIVO' ) {
            return res.status(400).json({
                msg: 'Token no válido - usuario con estado: INACTIVO'
            })
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, user.password);

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña son incorrectos'
            })
        }

        const token = await generarJWT( user.id );

        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
            code: 200
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
}

export const googleSignin = async ( req: Request, res: Response ) => {

    const { id_token } = req.body;
    
    try {
        const { name, email } = await googleVerify( id_token );

        const user = await User.findOne<any>({
            where: {
                email: email
            }
        });

        if ( !user ) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                google: true,
                college: name,
                status: 'ACTIVO'
            };

            await User.create(data);
        }

        // Si el usuario en DB
        if ( user.estado == 'INACTIVO' ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );
        
        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
            code: 200
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }
}

export const register = async ( req: Request, res: Response ) => {
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

        const user = await <any>User.create(req.body);

        const token = await generarJWT( user.id );

        res.status(201).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
            code: 201
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el usuario.'
        });
        console.log(error);
    }
}