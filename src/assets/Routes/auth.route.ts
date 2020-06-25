import { Request, Response, NextFunction } from 'express';

import { AuthController } from '../Controllers/auth.controller';

export class AuthRoute{
  
  public authController: AuthController = new AuthController();

  public routes(app:any):void {
    //Login Route
    app.route('/auth/login')
    .get(this.authController.loginController)

    //Register Route
    app.route('/auth/register')
    .post(this.authController.registerController)
  }

}
