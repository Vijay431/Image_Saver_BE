import express from "express";
import 'dotenv/config';
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import { Routes } from './assets/Routes/routes';

class App {
  public app: express.Application;
  public route: Routes = new Routes();

  constructor() {
    this.app = express();
    this.dbConnection();
    this.config();
    this.route.routes(this.app);
  }

  private dbConnection():any {
    mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((res: any) => { return console.log('DB Connected Successfully!') })
    .catch((err:any) => { return err })
  }

  private config():void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;