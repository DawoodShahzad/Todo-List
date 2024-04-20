import { Request, Response } from 'express';

abstract class BaseController {
  protected abstract service: any; // Replace 'any' with the type of your service

  async handleRequest(req: Request, res: Response, method: string) {
    try {
      const result = await this.service[method](req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default BaseController;
