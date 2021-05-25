/*
    rutas de usuarios / Auth
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');


router.post('/new',
    [
        //Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        validarCampos

    ],
     crearUsuario);


router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
    validarCampos
],
 loginUsuario);


router.get('/renew', validarJWT, revalidarToken);

module.exports = router;