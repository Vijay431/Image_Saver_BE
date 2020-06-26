import mongoose from 'mongoose';
import mongodb from 'mongodb';
import fs from 'fs';
import {Request, Response, NextFunction} from 'express';

import { ImageSchema } from '../Models/image.model';

const Image = mongoose.model('images', ImageSchema);

export class ImageController{
  public getImage(req:Request, res:Response, next:NextFunction) {
    Image.find({token: req.query.token}, (err:any, images:any) => {
      if(err) return res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
      if(images.length != 0){
        return res.status(200).json({message: 'success', images: images});
      }
      res.status(200).json({message: 'failure'});
    })
  }

  public saveImage(req:Request, res:Response, next:NextFunction) {
    let body = {
      token: req.body.token,
      id: req.body.id,
      caption: req.body.caption,
      image: {
        imgdata: fs.readFileSync(`./src/public/uploads/${req.file.filename}`),
        contentType: req.file.mimetype
      }
    }
    let newImage = new Image(body);

    newImage.save((err:any, image:any) => {
      if(err) return res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
      if(Object.keys(image).length != 0) return res.status(200).json({message: 'success'});
      res.status(200).json({message: 'failure'});
    })
  }

  public deleteImage(req:Request, res:Response, next:NextFunction) {
    Image.deleteOne({_id: new mongodb.ObjectId(req.body.id)}, (err:any) => {
      if(err) return res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
      res.status(200).json({message: 'success'});
    })
  }
}
