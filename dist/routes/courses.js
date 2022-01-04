"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("./../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("./../middlewares/validar-campos");
const course_1 = require("./../controllers/course");
const router = express_1.Router();
router.post('/', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
], course_1.getCourses);
router.post('/create', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id_grade', 'El grado es obligatorio').not().isEmpty(),
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('description', 'La descripcion es obligatoria').not().isEmpty(),
    express_validator_1.check('teacher', 'El docente es obligatorio').not().isEmpty(),
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], course_1.createCourse);
router.put('/edit/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id_grade', 'El grado es obligatorio').not().isEmpty(),
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('description', 'La descripcion es obligatoria').not().isEmpty(),
    express_validator_1.check('teacher', 'El docente es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], course_1.updateCourse);
router.delete('/delete/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], course_1.deleteCourse);
router.put('/activate/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('status', 'El estado es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], course_1.activateCourse);
exports.default = router;
//# sourceMappingURL=courses.js.map