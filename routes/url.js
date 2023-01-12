import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import validUrl from 'valid-url'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const router = express.Router();

router.post('/short', async(req, res) => {
    console.log("POST");
    console.log(req.body);

    const {origUrl} = req.body;
    const base = process.env.BASE;

    const urlId = nanoid();
    if (validUrl.isUri(origUrl)) {
        try {
            let url = await Url.findOne({origUrl});
            
            if (url) {
                console.log("URL already exists")
                res.json(url);
            } else {
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                  });

                  await url.save();
                  console.log("Saved");
                  res.json(url);
            }
            console.log("here")
            console.log(url);

        } catch(err){
            console.log(err);
            res.status(400).json('Internal Server Error');
        }

    } else {
        res.status(400).json('Invalid Original Url');
    }

})
export {router as urlsRouter}
