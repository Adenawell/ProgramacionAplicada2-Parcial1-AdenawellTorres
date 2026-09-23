import { prisma } from "../db.js";

export const listarlibros = async(req,res,next) =>{

    try{
        const libros = await prisma.libros.findMany();

        res.status(201).json(libros);


    }catch(error){
        next(error);
    }

}

export const agregarlibros = async(req,res,next) =>{
    try{
        const { titulo , autor , disponible } = req.body;

        if(!titulo || !autor){
            return res.status(400).json({message : 'faltan datos'})
        }

        const nuevoLibro = await prisma.libros.create({
            data:{
                titulo : titulo,
                autor : autor,
                disponible : true
            }
        })

        res.status(201).json({message : 'libro creado correctamente', nuevoLibro});

    }catch(error){
        next(error);
    }
}