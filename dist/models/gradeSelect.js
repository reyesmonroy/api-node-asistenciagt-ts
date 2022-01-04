"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const GradeSelect = connection_1.default.define('GradeSelect', {
    id: { field: 'id', type: sequelize_1.DataTypes.NUMBER, primaryKey: true, allowNull: false },
    name_grade: { field: 'nombre_grado', type: sequelize_1.DataTypes.STRING, allowNull: false },
    id_user: { field: 'id_usuario', type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    status: { field: 'estado', type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'grados_select'
});
exports.default = GradeSelect;
//# sourceMappingURL=gradeSelect.js.map