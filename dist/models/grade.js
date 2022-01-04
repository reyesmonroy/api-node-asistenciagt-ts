"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const gradeUser_1 = __importDefault(require("./gradeUser"));
const Grade = connection_1.default.define('Grade', {
    id: { field: 'id', type: sequelize_1.DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false },
    name: { field: 'nombre', type: sequelize_1.DataTypes.STRING, allowNull: false },
    section: { field: 'seccion', type: sequelize_1.DataTypes.STRING, allowNull: false },
    plan: { field: 'jornada', type: sequelize_1.DataTypes.STRING, allowNull: false },
    year: { field: 'anio', type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    status: { field: 'estado', type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
    tableName: 'grados'
});
Grade.hasMany(gradeUser_1.default, {
    foreignKey: 'id_grade',
    sourceKey: 'id',
    constraints: true,
    as: 'GradeUser'
});
exports.default = Grade;
//# sourceMappingURL=grade.js.map