import jwt from 'jsonwebtoken';

export const verificarToken = async(req, res, next) =>{
    try{
        const header = req.headers['authorization'];

        if(!header){
            res.status(400).json({message : 'falta header'});
        }

        const token = header.split(' ')[1];

        if(!token){
            res.status(400).json({message : 'Error fuertisimo animal en el token'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            res.status(400).json({message : 'un error fuerte mi socio en el decode'});
        }
        req.usuario = decoded;
        next();
    }catch(error){
        next(error);
    }
}

export const esAdmin = async(req,res,next) =>{
    try{

        if(req.usuario && req.usuario.rol == 'admin'){
            return next();
        }
        return res.status(403).json({message : 'No autorizado mi bro'});
    }catch(error){
        next(error);
    }
}