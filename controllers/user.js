import { request, response } from "express";
import bcryptjs from 'bcryptjs'
import {User} from '../models/user.js'

const usersGet = async (req,res=response)=>{
    /**
     * Traer la información de los usuarios con paginación
     * {{url}}/api/users?limite=6&desde=3
     */
    const {limite = 5, desde = 0} = req.query;
    const filter = {status:true}
    await User.find(filter)
        .skip(desde)
        .limit(limite)
        .exec()
        .then(async (responde) => {
            const total = await User.countDocuments(filter);
            res.json({
                total,
                responde
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg:"Error interno"
            });
        })

    
}

const usersPut = async (req=request,res=response)=>{
    const {id} = req.params;
    const {_id,password, google, mail,...resto} = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);  
    };

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user,
        ...{msg:"Usuario Actualizado con exito"},
    });
}


const usersPost = async (req=request,res=response)=>{
    //console.log(req.body)
    
    const {name,mail,role,password} = req.body;
    const user = new User ({
        name,
        mail,
        role,
        password
    });

    // Verificar si el correo existe

    // encriptar la contraseña
    
    const salt = bcryptjs.genSaltSync(); // permite definir el numero de veces que se va encriptar, por defecto son 10

    user.password = await bcryptjs.hashSync(password, salt);

    // Guardar en la base de datos

    await user.save();
    res.json({
        user,
        ...{msg: `Usuario Creado con exito`},
    });
}

const usersDelete = async(req,res=response)=>{
    const {id} = req.params;

    // borrarlo fisicamente de la base de datos
    //const user = await User.findByIdAndDelete(id);

    // Cambiar el estado de activo a false de esta manera no eliminamos registros sino 
    // solamente dejamos de mostrarlo
    const user  = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        id,
        user
    });
}


export {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
};