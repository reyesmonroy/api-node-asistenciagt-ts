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
exports.register = exports.googleSignin = exports.login = void 0;
const generarJWT_1 = require("./../helpers/generarJWT");
const google_verify_1 = require("./../helpers/google-verify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(400).json({
                data: user,
                errors: 'No existe usuario con el correo proporcionado.',
                code: 200
            });
        }
        // Verificar si el uid tiene estado ACTIVO
        if (user.status != 'ACTIVO') {
            return res.status(400).json({
                msg: 'Token no válido - usuario con estado: INACTIVO'
            });
        }
        //Verificar la contraseña
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña son incorrectos'
            });
        }
        const token = yield generarJWT_1.generarJWT(user.id);
        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
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
exports.login = login;
const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email } = yield google_verify_1.googleVerify(id_token);
        const user = yield user_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                google: true,
                college: name,
                status: 'ACTIVO'
            };
            yield user_1.default.create(data);
        }
        // Si el usuario en DB
        if (user.estado == 'INACTIVO') {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        // Generar el JWT
        const token = yield generarJWT_1.generarJWT(user.id);
        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
            code: 200
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
});
exports.googleSignin = googleSignin;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = yield generarJWT_1.generarJWT(user.id);
        res.status(201).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    status: user.status
                },
                token: token
            },
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
exports.register = register;
//# sourceMappingURL=authentication.js.map