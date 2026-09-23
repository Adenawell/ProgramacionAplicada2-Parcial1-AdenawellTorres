import express from 'express'
import { esAdmin } from '../middlewares/auth.middleware.js';
import { listarlibros, agregarlibros } from '../controllers/libros.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get("/", listarlibros);
router.post("/agregar", verificarToken, esAdmin , agregarlibros);


export default router;