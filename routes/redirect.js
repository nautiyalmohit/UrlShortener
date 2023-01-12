import express from 'express'
import Url from '../models/Url.js'
const router = express.Router();

router.get('/:urlId', async(req, res) => {
    try {
        console.log("Redirected");
        const url = await Url.findOne({urlId:req.params.urlId});
        if (url) {
            await Url.updateOne(
                {
                    urlId: req.params.urlId
                },
                {   $inc: {clicks: 1}}
            );
            return res.redirect(url.origUrl);
        } else {
            res.status(404).json('Not found');
        }
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
})
export {router as redirectRouter};