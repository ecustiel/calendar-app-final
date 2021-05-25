const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usr-model');
const {genJWT} = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {
    
    const {email, password} = req.body;

    try {
        let user = await Usuario.findOne({ email });
        
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya existe en nuestra base de datos'
            })
        }
      
         user = new Usuario(req.body);

         //JWT
         const token = await genJWT(user.id, user.name);

         //Encriptando contraseña
         const salt = bcrypt.genSaltSync();
         user.password = bcrypt.hashSync(password, salt);
    
        await user.save(); 
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

//loginUsuario
const loginUsuario = async(req, res = response) => {

    const {email, password} = req.body;
    
    try {
        
        const user = await Usuario.findOne({ email });
        
        
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario es incorrectoooo'
            })
        }

        //comparando passwords
        const correctPassword = bcrypt.compareSync(password, user.password);

        if(!correctPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta'
            })
        }

        //JWT
        const token = await genJWT(user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

    
}

//revalidarToken
const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;
    
    const token = await genJWT(uid, name);

    res.json({
        ok: true,
        uid, 
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}