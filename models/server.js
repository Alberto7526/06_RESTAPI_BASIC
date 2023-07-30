import express from "express";
import cors from 'cors';
import routerUser from "../routes/user.js";
import * as url from 'url';

export default class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // middlewares 
        this.middlewares();
        // rutas
        this.usersPath = '/api/users';
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, routerUser);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo por el puerto', this.port)
        })
    };

    middlewares () {
        /**
         * Permite definir mi directorio plublico
         */
        this.app.use(express.static('public'));
        // se utilizan los cors 
        this.app.use(cors());
        // lectura y parseo del body, lo que llegue en el body tratara de serializarlo a json
        this.app.use(express.json());

    }

};