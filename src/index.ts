import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { connect } from './database/config/config';
import indexRoute from './routes';

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', indexRoute);

const port: number = Number(process.env.PORT) || 3000;

const startServer = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
            console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startServer();
