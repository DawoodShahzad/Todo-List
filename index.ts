import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes';
import todoListRoutes from './src/routes/todoListRoutes';
import dotenv from 'dotenv';

dotenv.config()

const mongoUri = process.env.MONGO_URI as string
const port = process.env.PORT

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', todoListRoutes);

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            console.log('app is running on port', port);
        })
    })
    .catch((error) => {
        console.log(error);
    })

export default app;