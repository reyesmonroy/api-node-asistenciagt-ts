"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authentication_1 = require("./../controllers/authentication");
const validar_campos_1 = require("./../middlewares/validar-campos");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'El correo no es valido').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], authentication_1.login);
router.post('/google', [
    express_validator_1.check('id_token', 'El id_token es necesario').not().isEmpty(),
    validar_campos_1.validarCampos
], authentication_1.googleSignin);
router.post('/register', [
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El correo no es valido').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligatoria').not().isEmpty(),
    express_validator_1.check('college', 'El colegio es obligatorio').not().isEmpty(),
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], authentication_1.register);
exports.default = router;
//# sourceMappingURL=auth.js.map