import { Request, Response } from 'express';
import BaseController from './BaseController';
import shoppingListService from '../services/shoppingListService';

class ShoppingListController extends BaseController {
  protected service = shoppingListService;

  async shareList(req: Request, res: Response) {
    await this.handleRequest(req, res, 'shareList');
  }

  async getSharedLists(req: Request, res: Response) {
    await this.handleRequest(req, res, 'getSharedLists');
  }
}

export default new ShoppingListController();
