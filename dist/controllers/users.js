"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            where: {
                status: 'ACTIVO'
            }
        });
        res.status(200).json({
            data: users,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                error: 'Ya existe un Usuario con el mismo email' + email
            });
        }
        const salt = bcrypt_1.default.genSaltSync();
        req.body.password = bcrypt_1.default.hashSync(password, salt);
        const user = yield user_1.default.create(req.body);
        res.status(201).json({
            data: user,
            code: 201
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el usuario.'
        });
        console.log(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }
        if (password) {
            // Encriptar la contraseña
            const salt = bcrypt_1.default.genSaltSync();
            req.body.password = bcrypt_1.default.hashSync(password, salt);
        }
        yield (user === null || user === void 0 ? void 0 : user.update(req.body));
        res.status(200).json({
            data: user,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el usuario.'
        });
        console.log(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }
        yield (user === null || user === void 0 ? void 0 : user.update({ status: status }));
        res.status(200).json({
            data: user,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el usuario.'
        });
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
const activateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: `No existe un Usuario con el id ${id}`
            });
        }
        yield (user === null || user === void 0 ? void 0 : user.update({ status: status }));
        res.status(200).json({
            data: user,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el usuario.'
        });
        console.log(error);
    }
});
exports.activateUser = activateUser;
//# sourceMappingURL=users.js.map