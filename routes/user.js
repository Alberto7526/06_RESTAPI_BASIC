import { Router } from "express";
import { body } from "express-validator";
import {
    usersDelete, 
    usersGet,
    usersPost,
    usersPut} from '../controllers/user.js'

import { ValidarIdMongo, validarCampos,UserExiste } from "../middleware/validar_campos.js";
import { esRolValido, mailExiste } from "../helpers/db_validators.js";


const routerUser = Router();

routerUser.get('/', usersGet);
routerUser.put('/:id',[
    ValidarIdMongo,
    UserExiste,
    body('role').custom(esRolValido),
    validarCampos
], usersPut);
routerUser.post('/', 
[
    body('mail', 'Correo No Valido').isEmail(),
    body('mail').custom(mailExiste),
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'La contraseña debe tener por lo menos 6 caracteres').isLength({min:6}),
    //body('role', 'rol no valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    body('role').custom(esRolValido),
    validarCampos
]
,usersPost);
routerUser.delete('/:id',
[
    ValidarIdMongo,
    UserExiste
]
,usersDelete);




export default routerUser;