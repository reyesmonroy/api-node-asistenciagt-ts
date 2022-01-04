import { DataTypes } from 'sequelize';
import db from '../db/connection';
import GradeUser from './gradeUser';

const User = db.define('User', {
    id: { field: 'id', type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: { field: 'nombre', type: DataTypes.STRING, allowNull: false},
    email: { field: 'email', type: DataTypes.STRING, allowNull: false},
    password: { field: 'password', type: DataTypes.STRING, allowNull: false},
    phone: { field: 'telefono', type: DataTypes.STRING, allowNull: true},
    college: { field: 'colegio', type: DataTypes.STRING, allowNull: false},
    google: { field: 'google', type: DataTypes.TINYINT, allowNull: true, defaultValue: false},
    status: { field: 'estado', type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'usuarios'
});

/* User.hasMany(GradeUser, {
    foreignKey: 'id_user',
    sourceKey: 'id',
    constraints: false,
    as: 'Grade'
}); */

export default User;