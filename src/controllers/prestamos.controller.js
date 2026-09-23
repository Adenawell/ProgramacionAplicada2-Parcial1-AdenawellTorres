import { prisma } from "../db.js";


export const pedirLibro = async(req,res,next) =>{
    const { libroId } = parseInt(req.body);
    const usuarioId = req.usuario.id;

    try{

        const libro = await prisma.libros.finUnique({
            where : libroId
        });

        if(!libro){
            res.status(400).json({message : 'no hay libro '});
        }

        if(!libro.disponible){
            res.status(400).json({message : 'libro no disponible'});
        }

        const prestamos = await prestamos.create({
            data:{
                usuarioId,
                libroId
            },
            include:{libro : true , usuario : { select : {id: true ,email : true }}}
        });

        await prisma.libro.update({
            where:{ libroId},
            data:{
                disponible:false
            }
        });

        res.status(201).json({message : 'prestamo realizado exitosamente', prestamos})
    }catch(error){
        next(error);
    }
}

export const verMisPrestamos = async(req,res,next) =>{
    const usuarioId = req.usuario.id;

    try{
        const prestamos = await prisma.prestamos.findMany({
            where : {usuarioId },
            include : {libro : true}
        })
        res.json(prestamos);
    }catch(error){
        next(error);
    }
}

export const verTodosPrestamos = async(req,res,next) =>{

    try{
        const prestamos = await prisma.prestamos.findMany({
            include : {libro : true}
        })
        res.json(prestamos);
    }catch(error){
        next(error);
    }
}

