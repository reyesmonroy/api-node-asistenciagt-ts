"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const GradeUser = connection_1.default.define('GradeUser', {
    id_grade: { field: 'id_grado', type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    id_user: { field: 'id_usuario', type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    permission: { field: 'permiso', type: sequelize_1.DataTypes.STRING, allowNull: false },
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
exports.default = GradeUser;
//# sourceMappingURL=gradeUser.js.map