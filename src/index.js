import 'dotenv/config';
import express from 'express';
import prestamosRoutes from './routes/prestamos.routes.js';
import authRoutes from './routes/auth.routes.js';
import librosRoutes from './routes/libros.routes.js'
import { verificarToken } from './middlewares/auth.middleware.js';


const app = express();


app.use(express.json());
const PORT  = process.env.PORT || 3000;

const error = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Error interno del servidor" });
}

app.use(error);

app.use("/prestamos", verificarToken, prestamosRoutes);
app.use("/auth", authRoutes);
app.use("/libros", librosRoutes);



app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});




