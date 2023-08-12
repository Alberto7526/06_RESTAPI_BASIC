import express from "express";
import cors from 'cors';
import routerUser from "../routes/user.js";
import * as url from 'url';
import { dbConnection } from "../database/config.js";

export default class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //conectar base de datos 
        this.conectarDB();
        // middlewares 
        this.middlewares();
        // rutas
        this.usersPath = '/api/users';
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
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