import express from 'express';
import connectDB from './config/db.js'
import {nanoid} from 'nanoid'
import {urlsRouter} from './routes/url.js';
import mongoose from 'mongoose';
import { redirectRouter } from './routes/redirect.js';
import path from 'path';
import cors from 'cors';
const PORT = process.env.PORT;

mongoose.set('strictQuery', true);
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'*'}))

app.use('/api', urlsRouter);  //For making short links
app.use('/', redirectRouter); //Redirecting to short links
app.use('/test', () => console.log("Rnning fine"))

app.listen(PORT, () => {
    console.log("App is up")
    console.log(`PORT NO ${PORT}`);
    console.log(`DB_URI ${process.env.DB_URI}`);
})
