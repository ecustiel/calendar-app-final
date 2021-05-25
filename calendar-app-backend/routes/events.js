/*

    Event Routes
    /api/events

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT } = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')

const router = Router();

//Validacion para todas las rutas
router.use(validarJWT);

//Obtener Eventos
router.get('/', getEventos);


//Crear un nuevo evento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de fin obligatoria').custom(isDate),
        validarCampos
    ]
, crearEvento);


//Actualizar Evento
router.put('/:id', actualizarEvento);



//Borrar Evento
router.delete('/:id', eliminarEvento);




module.exports = router;