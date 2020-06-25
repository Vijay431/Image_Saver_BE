import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { AuthSchema } from '../Models/auth.model';

const Auth = mongoose.model('users', AuthSchema);

export class AuthController{

  public loginController(req:Request, res:Response, next:NextFunction) {
    Auth.find(req.query, (err:any, users:any) => {
      if(err){
        return res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
      }
      if(users.length != 0){
        return res.status(200).json({message: 'success'});
      }
      res.status(401).json({message: 'failure'});
    })
  }

  public registerController(req:Request, res:Response, next:NextFunction) {
    let newUser = new Auth(req.body);

    newUser.save((err:any, docStatus:any) => {
      if(err) return res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
      if(Object.keys(docStatus).length != 0){
        return res.status(200).json({message: 'success'});
      }
      res.status(200).json({message: 'failure'});
    })
  }

}
