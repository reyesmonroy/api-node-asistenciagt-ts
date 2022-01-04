import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Grade from './grade';
import User from './user';

const GradeUser = db.define('GradeUser', {
    id_grade: { field: 'id_grado', type: DataTypes.NUMBER, allowNull: false},
    id_user: { field: 'id_usuario', type: DataTypes.NUMBER, allowNull: false},
    permission: { field: 'permiso', type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'grados_usuarios'
});

GradeUser.removeAttribute('id');

/* GradeUser.belongsTo(User, {
    foreignKey: 'id_usuario',
    targetKey: 'id',
    constraints: true,
    as: 'User'
});

GradeUser.belongsTo(Grade, {
    foreignKey: 'id_grade',
    targetKey: 'id',
    constraints: true, 
    as: 'Grade'
}); */

export default GradeUser;