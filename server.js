import express from 'express';
import connectDB from './config/db.js'
import {nanoid} from 'nanoid'
import {urlsRouter} from './routes/url.js';
import mongoose from 'mongoose';
import { redirectRouter } from './routes/redirect.js';

const app = express();
mongoose.set('strictQuery', true);
connectDB();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', urlsRouter);
app.use('/', redirectRouter);

app.listen(PORT, () => {
    console.log("App is up")
    console.log(`${PORT} and ${process.env.DB_URI}`)
})
