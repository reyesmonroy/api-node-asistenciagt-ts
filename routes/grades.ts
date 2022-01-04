import { Router } from 'express';
import { validarJWT } from './../middlewares/validar-jwt';
import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { getGrades, createGrade, updateGrade, deleteGrade, activateGrade, getGradesSelect } from './../controllers/grades';

const router = Router();

router.post('/', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
], getGrades);
router.post('/select', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
], getGradesSelect);
router.post('/create', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('section', 'La seccion es obligatoria').not().isEmpty(),
    check('plan', 'El plan es obligatorio').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], createGrade);
router.put('/edit/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('section', 'La seccion es obligatoria').not().isEmpty(),
    check('plan', 'El plan es obligatorio').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    validarCampos
], updateGrade);
router.delete('/delete/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], deleteGrade);
router.put('/activate/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], activateGrade);

export default router;