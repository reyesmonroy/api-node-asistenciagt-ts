import { Router } from 'express';
import { validarJWT } from './../middlewares/validar-jwt';
import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { getUsers, createUser, updateUser, deleteUser, activateUser } from './../controllers/users';

const router = Router();

router.get('/', [
    validarJWT,
], getUsers);
router.post('/create', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('college', 'El colegio es obligatorio').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], createUser);
router.put('/edit/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('college', 'El colegio es obligatorio').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], updateUser);
router.delete('/delete/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], deleteUser);
router.put('/activate/:id', [
    validarJWT,
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], activateUser);

export default router;