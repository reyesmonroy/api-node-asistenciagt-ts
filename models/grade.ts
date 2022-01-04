import { DataTypes } from 'sequelize';
import db from '../db/connection';
import GradeUser from './gradeUser';

const Grade = db.define('Grade', {
    id: { field: 'id', type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: { field: 'nombre', type: DataTypes.STRING, allowNull: false},
    section: { field: 'seccion', type: DataTypes.STRING, allowNull: false},
    plan: { field: 'jornada', type: DataTypes.STRING, allowNull: false},
    year: { field: 'anio', type: DataTypes.NUMBER, allowNull: false},
    status: { field: 'estado', type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'grados'
});


Grade.hasMany(GradeUser, {
    foreignKey: 'id_grade',
    sourceKey: 'id',
    constraints: true,
    as: 'GradeUser'
});

export default Grade;