import { Role } from "../models/role.js";
import { User } from "../models/user.js";


const esRolValido = async (role = '')=> {
    const existeRole = await Role.findOne({role});
    if (!existeRole){
        throw new Error (`El rol ${role} no existe en la base de datos`)
    } 
};

const mailExiste = async (mail = '') => {
    const existMail = await User.findOne({mail});
    if (existMail){
        throw new Error (`El correo ${mail} ya existe en la base de datos`)
    }
};


export {
    esRolValido,
    mailExiste,

}