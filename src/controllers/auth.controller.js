import { prisma } from "../db.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const Registro = async(req, res, next) =>{
    try{
        const { nombre, email, password, rol } = req.body

        if(!nombre || !email || !password){
            return res.status(400).json({message: 'faltan algunos campos'});
        }

        const existeEmail = await prisma.usuario.findUnique({where: { email }});

        if(existeEmail){
            return res.status(400).json({message: 'ya existe un usuario con ese email'});
        }

        const hasPSW = await bcrypt.hash(password, 10);

        const usuarioRegister = await prisma.usuario.create({
            data:{
                nombre: nombre,
                email: email,
                password: hasPSW,
                rol: rol || "usuario"
            }
        });

        return res.status(201).json(usuarioRegister);
    }catch(error){
        next(error);
    }
}

export const login = async(req, res, next) =>{
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({message: 'faltan campos'});
        }

        const usuarioExiste = await prisma.usuario.findUnique({where: { email }});

        if(!usuarioExiste){
            return res.status(400).json({message: 'el usuario no esta registrado'});
        }

        const passwordValid = await bcrypt.compare(password, usuarioExiste.password);

        if(!passwordValid){
            return res.status(400).json({message: 'credenciales invalidas'});
        }

        const loginUser = jwt.sign(
            { nombre: usuarioExiste.nombre, email: usuarioExiste.email, rol: usuarioExiste.rol },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({message: 'usuario logeado', loginUser});

    }catch(error){
        next(error);
    }
}