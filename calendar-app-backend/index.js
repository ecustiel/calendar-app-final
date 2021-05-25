const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();




//crear el servidor de express
const app = express();

//Base de datos
dbConnection();


//cors
app.use(cors());

//directorio publico
app.use( express.static('public')) //el use es un middleware, una funcion que se ejecuta siempre que pase por el servidor

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//CRUD de eventos



//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})