const {response} = require('express');
const Evento = require('../models/event-model');

const getEventos = async(req, res = response) => {


    const events = await Evento.find().populate('user', 'name');

        res.json({
            ok: true,
            events
        })
}

const crearEvento = async(req, res = response) => {

    const event = new Evento(req.body);

    try {

        event.user = req.uid;

        const eventSaved = await event.save();
       
        res.json({
            ok:true,
            evento: eventSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Evento.findById(eventoId)

        if(!evento){
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() != req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            })
        }
        
        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Adminstrador'
        })
    }


    
}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Evento.findById(eventoId)

        if(!evento){
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() != req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este evento'
            })
        }
        
        await Evento.findByIdAndDelete(eventoId);


        res.json({
            ok: true,
            msg: 'Evento eliminado correctamente'
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Adminstrador'
        })
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}