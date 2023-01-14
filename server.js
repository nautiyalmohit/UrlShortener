import express from 'express';
import connectDB from './config/db.js'
import {nanoid} from 'nanoid'
import {urlsRouter} from './routes/url.js';
import mongoose from 'mongoose';
import { redirectRouter } from './routes/redirect.js';
import path from 'path';

const app = express();
mongoose.set('strictQuery', true);
connectDB();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');



app.use('/api', urlsRouter);  //For making short links
app.use('/', redirectRouter); //Redirecting to short links

app.listen(PORT, () => {
    console.log("App is up")
    console.log(`${PORT} and ${process.env.DB_URI}`)
})
