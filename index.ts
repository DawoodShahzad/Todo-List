import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import shoppingListRoutes from './src/routes/shoppingListRoutes';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config()

const mongoUri = process.env.MONGO_URI as string
const port = process.env.PORT

const app = express();

app.use(bodyParser.json());

app.use('/api', shoppingListRoutes);
app.use('/api', userRoutes);

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