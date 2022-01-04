import { DataTypes } from 'sequelize';
import db from '../db/connection';

const GradeCourse = db.define('GradeCourse', {
    id: { field: 'id', type: DataTypes.NUMBER, primaryKey: true, allowNull: false},
    id_grade: { field: 'id_grado', type: DataTypes.NUMBER, allowNull: false},
    name: { field: 'nombre', type: DataTypes.STRING, allowNull: false},
    description: { field: 'descripcion', type: DataTypes.STRING, allowNull: false},
    teacher: { field: 'docente', type: DataTypes.STRING, allowNull: false},
    id_user: { field: 'id_usuario', type: DataTypes.NUMBER, allowNull: false},
    status: { field: 'estado', type: DataTypes.STRING, allowNull: false},
    name_grade: { field: 'nombre_grado', type: DataTypes.STRING, allowNull: false},
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'grados_cursos'
});

export default GradeCourse;