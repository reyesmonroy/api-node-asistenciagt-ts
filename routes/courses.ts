import { Router } from 'express';
import { validarJWT } from './../middlewares/validar-jwt';
import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { getCourses, createCourse, updateCourse, deleteCourse, activateCourse } from './../controllers/course';

const router = Router();

router.post('/', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
], getCourses);
router.post('/create', [
    validarJWT,
    check('id_grade', 'El grado es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('teacher', 'El docente es obligatorio').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], createCourse);
router.put('/edit/:id', [
    validarJWT,
    check('id_grade', 'El grado es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('teacher', 'El docente es obligatorio').not().isEmpty(),
    validarCampos
], updateCourse);
router.delete('/delete/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], deleteCourse);
router.put('/activate/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], activateCourse);

export default router;