"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('usuarios', {
    id: { field: 'id', type: sequelize_1.DataTypes.NUMBER, autoIncrement: true, allowNull: false },
    name: { field: 'nombre', type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { field: 'email', type: sequelize_1.DataTypes.STRING, allowNull: false },
    password: { field: 'password', type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone: { field: 'telefono', type: sequelize_1.DataTypes.STRING, allowNull: true },
    college: { field: 'colegio', type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { field: 'estado', type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
    tableName: 'usuarios'
});
exports.default = User;
//# sourceMappingURL=users.js.map