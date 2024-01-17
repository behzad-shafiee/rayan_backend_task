import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class TaskMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('details task request ...');
    console.log(`req method : ${req.method}`);
    console.log(`req.url : ${req.url}`);
    console.log(`req timestamp : ${Date.now()}`);
    next();
  }
}
