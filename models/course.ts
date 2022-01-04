import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Course = db.define('Course', {
    id: { field: 'id', type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false},
    id_grade: { field: 'id_grado', type: DataTypes.NUMBER, allowNull: false},
    name: { field: 'nombre', type: DataTypes.STRING, allowNull: false},
    description: { field: 'descripcion', type: DataTypes.STRING, allowNull: false},
    teacher: { field: 'docente', type: DataTypes.STRING, allowNull: false},
    status: { field: 'estado', type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'cursos'
});

export default Course;