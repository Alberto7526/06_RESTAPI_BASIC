import {Schema, model} from 'mongoose';


const userSchema = Schema ({
    name : {
        type: String,
        required: [true,'El nombre es requerido']
    },
    mail:{
        type: String,
        required: [true,'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es requerido']
    },
    img: {
        type: String
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

userSchema.methods.toJSON = function () {
    /**
     * Permite sobreescribir el metodo toJson para que no muestre 
     * los campos __v y el password cuando se haga la transformación 
     * o se devuelva este objeto
     */
    const {__v, password, ...user} = this.toObject();
    //console.log(user);
    return user
};

const User = model('users',userSchema);

export  {
    User
}