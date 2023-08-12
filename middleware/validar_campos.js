import { validationResult } from "express-validator";
import {mongoose} from 'mongoose';
import {User} from '../models/user.js'

const validarCampos = (req, res, next) => {
    /**
     * Permite llamar las validaciones definidas en la ruta y devulve un bad request error 400
     * En caso de que no cumpla las validaciones definidas en las rutas
     * 
     */
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
};

const ValidarIdMongo = (req,res, next) => {
    /**
     * Permite validar si el id ingresado es un Id valido 
     */
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json(`El Id no es valido, ${id}`);
    }
      
    next();
} ;

const UserExiste = async (req,res,next) => {
    try {
        const id = req.params.id
        const existUser = await User.findById(id);
        if (!existUser){
            return res.status(400).json(`El Id no existe, ${id}`);
            //throw new Error (`El Id no existe, ${id}`);
        }
        next();
    }catch (error){
        console.log(error);
        next();
    };
};





export {
    validarCampos,
    ValidarIdMongo,
    UserExiste
}