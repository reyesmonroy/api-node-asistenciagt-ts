import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignin, register } from './../controllers/authentication';
import { validarCampos } from './../middlewares/validar-campos';

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('college', 'El colegio es obligatorio').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], register);

export default router;