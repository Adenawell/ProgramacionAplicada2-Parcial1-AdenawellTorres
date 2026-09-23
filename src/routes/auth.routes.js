import express from 'express'
import { Registro , login } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/registro", Registro);
router.post("/login", login);


export default router;