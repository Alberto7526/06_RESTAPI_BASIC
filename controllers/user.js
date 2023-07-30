import { request, response } from "express";

const usersGet = (req,res=response)=>{
    const {nombre = 'None',apellido,id} = req.query;
    res.status(501).json({
        ok:true,
        msg:"get API - controller",
        nombre,
        apellido,
        id
    });
}

const usersPut = (req=request,res=response)=>{
    const {userId} = req.params;
    res.json({
        ok:true,
        msg:"put API- controller",
        id: userId
    });
}


const usersPost = (req=request,res=response)=>{
    console.log(req.body)
    res.json({
        ok:true,
        msg:"post API- controller",
        msg2: `Hola ${req.body.nombre}`
    });
}

const usersDelete = (req,res=response)=>{
    res.json({
        ok:true,
        msg:"delete API- controller"
    });
}


export {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
};