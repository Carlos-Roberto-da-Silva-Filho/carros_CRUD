// Arquivo: main.ts

import express, { Request, Response } from "express"
import routes from "./Api/routes";
import Logger from "./infra/Logger";
import { basicAuthMiddleware } from "./Api/middleware/basicAuthMiddleware";
import errorhandler from "./Api/middleware/errorhandler";


const app = express();
const port = 3000;

app.use(express.json());

app.use(Logger.init());

app.use(basicAuthMiddleware);

// rotas da aplicação
app.use('/api', routes);

app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({message: "Aplicação rodando !!!!"})
});

app.use(errorhandler);

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`);
});