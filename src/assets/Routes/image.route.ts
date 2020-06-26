import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';

import { ImageController } from '../Controllers/image.controller';

const storage = multer.diskStorage({
  destination: function(req:Request, file:any, cb:any){
    let path:String;
    const readdir = function(){
      if(fs.existsSync('./src/public/uploads/')){
        return './src/public/uploads/'
      }
      else{
        fs.mkdir('./src/public/uploads/', (err:any) => {
          if(err) throw err;
        });
        return './src/public/uploads/'
      }
    }
    cb(null, readdir());
  },
  filename: function(req:Request, file:any, cb:any){
    cb(null, Date.now() + file.originalname);
  }
})
const fileFilter = (req:any, file:any, cb:any) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
    return cb(null, true);
  }
  cb(null, false);
}
const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
});

export class ImageRoute{
  public imageController: ImageController = new ImageController();

  public routes(app:any):void {
    //Get all Images Route
    app.route('/image/get')
    .get(this.imageController.getImage)

    //Save all Images Route
    app.route('/image/save')
    .post(upload.single('image'), this.imageController.saveImage)

    //Delete all Images Route
    app.route('/image/delete')
    .post(this.imageController.deleteImage)
  }
}
