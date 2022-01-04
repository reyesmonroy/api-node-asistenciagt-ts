import { DataTypes } from 'sequelize';
import db from '../db/connection';

const GradeSelect = db.define('GradeSelect', {
    id: { field: 'id', type: DataTypes.NUMBER, primaryKey: true, allowNull: false},
    name_grade: { field: 'nombre_grado', type: DataTypes.STRING, allowNull: false},
    id_user: { field: 'id_usuario', type: DataTypes.NUMBER, allowNull: false},
    status: { field: 'estado', type: DataTypes.STRING, allowNull: false},
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'grados_select'
});

export default GradeSelect;