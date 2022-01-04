"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Course = connection_1.default.define('Course', {
    id: { field: 'id', type: sequelize_1.DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false },
    id_grade: { field: 'id_grado', type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    name: { field: 'nombre', type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { field: 'descripcion', type: sequelize_1.DataTypes.STRING, allowNull: false },
    teacher: { field: 'docente', type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { field: 'estado', type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
    tableName: 'cursos'
});
exports.default = Course;
//# sourceMappingURL=course.js.map