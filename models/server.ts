import express, { Application } from "express";
import cors from 'cors';

import db from '../db/connection';
import courseRoutes from './../routes/courses';
import gradeRoutes from './../routes/grades';
import userRoutes from './../routes/users';
import authRoutes from './../routes/auth';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        courses: '/api/courses',
        grades: '/api/grades',
        users: '/api/users',
        auth: '/api/auth',
    };
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares(); 
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log(`La base de datos esta online`);
        } catch (error) {
            console.log(`La base de datos error en la conexión`);
        }
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        //carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.grades, gradeRoutes);
        this.app.use(this.apiPaths.courses, courseRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;