import { Router } from "express";
import {
    usersDelete, 
    usersGet,
    usersPost,
    usersPut} from '../controllers/user.js'

const routerUser = Router();

routerUser.get('/', usersGet);
routerUser.put('/:userId', usersPut);
routerUser.post('/', usersPost);
routerUser.delete('/',usersDelete);




export default routerUser;