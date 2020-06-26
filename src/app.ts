import express from "express";
import 'dotenv/config';
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import { AuthRoute } from './assets/Routes/auth.route';
import { ImageRoute } from './assets/Routes/image.route';

class App {
  public app: express.Application;
  public authroute: AuthRoute = new AuthRoute();
  public imageRoute: ImageRoute = new ImageRoute();

  constructor() {
    this.app = express();
    this.dbConnection();
    this.config();
    this.authroute.routes(this.app);
    this.imageRoute.routes(this.app);
  }

  private dbConnection():any {
    let DB_URL = "mongodb+srv://vijay431:qb4HlceRhCxNbu7K@crud1-hvcos.mongodb.net/imagesaver?retryWrites=true&w=majority";
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((res:any) => console.log('DB Connected Successfully!'))
    .catch((err:any) => {throw err})
  }

  private config():void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
