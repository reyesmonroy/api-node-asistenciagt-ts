"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("./../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("./../middlewares/validar-campos");
const grades_1 = require("./../controllers/grades");
const router = express_1.Router();
router.post('/', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
], grades_1.getGrades);
router.post('/select', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
], grades_1.getGradesSelect);
router.post('/create', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('section', 'La seccion es obligatoria').not().isEmpty(),
    express_validator_1.check('plan', 'El plan es obligatorio').not().isEmpty(),
    express_validator_1.check('year', 'El año es obligatorio').not().isEmpty(),
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grades_1.createGrade);
router.put('/edit/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('section', 'La seccion es obligatoria').not().isEmpty(),
    express_validator_1.check('plan', 'El plan es obligatorio').not().isEmpty(),
    express_validator_1.check('year', 'El año es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grades_1.updateGrade);
router.delete('/delete/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grades_1.deleteGrade);
router.put('/activate/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grades_1.activateGrade);
exports.default = router;
//# sourceMappingURL=grades.js.map