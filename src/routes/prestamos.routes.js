import express from 'express'
import { pedirLibro, verMisPrestamos, verTodosPrestamos} from '../controllers/prestamos.controller.js';
import { esAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/" , pedirLibro);
router.get("/misPrestamos", verMisPrestamos);
router.get("/prestamos" , esAdmin , verTodosPrestamos)

export default router;