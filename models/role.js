import {Schema, model} from 'mongoose';


const roleSchema = Schema ({
    role : {
        type: String,
        required: [true,'El rol es requerido']
    }
})


const Role = model('roles',roleSchema);

export  {
    Role
}