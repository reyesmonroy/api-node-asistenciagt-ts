"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("./../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("./../middlewares/validar-campos");
const users_1 = require("./../controllers/users");
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.validarJWT,
], users_1.getUsers);
router.post('/create', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El correo no es valido').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligatoria').not().isEmpty(),
    express_validator_1.check('college', 'El colegio es obligatorio').not().isEmpty(),
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], users_1.createUser);
router.put('/edit/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El correo no es valido').isEmail(),
    express_validator_1.check('college', 'El colegio es obligatorio').not().isEmpty(),
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], users_1.updateUser);
router.delete('/delete/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], users_1.deleteUser);
router.put('/activate/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], users_1.activateUser);
exports.default = router;
//# sourceMappingURL=users.js.map