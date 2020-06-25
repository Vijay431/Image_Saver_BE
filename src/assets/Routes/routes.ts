import { Request, Response, NextFunction } from 'express';

export class Routes{
  public routes(app:any):void {
    app.route('/')
    .get((req: Request, res: Response) => {
      res.status(200).send('Hello');
    })
  }
}