import mongoose from "mongoose";

const dbConnection = async() => {
    try{

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos Online');

    }catch(error) {

        console.log(error)
        throw Error('Error en la base de datos')
    }
};

export {
    dbConnection
};