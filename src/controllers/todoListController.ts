import { Request, Response } from 'express';
import BaseController from './BaseController';
import todoListService from '../services/todoListService';

class TodoListController extends BaseController {
  constructor() {
    super();
    this.createTodoList = this.createTodoList.bind(this);
    this.getTodoListById = this.getTodoListById.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
    this.deleteTodoList = this.deleteTodoList.bind(this);
    this.addItemToTodoList = this.addItemToTodoList.bind(this);
    this.deleteItemFromTodoList = this.deleteItemFromTodoList.bind(this);
  }

  async createTodoList(req: Request, res: Response) {
    try {
      const todoList = await todoListService.createTodoList(req.body);
      this.sendCreatedResponse(res, todoList);
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }

  async getTodoListById(req: Request, res: Response) {
    try {
      const todoList = await todoListService.getTodoListById(req.params.id);
      if (!todoList) {
        this.sendNotFoundResponse(res, 'Todo list not found');
      } else {
        this.sendSuccessResponse(res, 200, todoList);
      }
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }

  async updateTodoList(req: Request, res: Response) {
    try {
      const todoList = await todoListService.updateTodoList(req.params.id, req.body);
      if (!todoList) {
        this.sendNotFoundResponse(res, 'Todo list not found');
      } else {
        this.sendSuccessResponse(res, 200, todoList);
      }
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }

  async deleteTodoList(req: Request, res: Response) {
    try {
      await todoListService.deleteTodoList(req.params.id);
      this.sendNoContentResponse(res);
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }

  async addItemToTodoList(req: Request, res: Response) {
    try {
      const todoList = await todoListService.addItemToTodoList(req.params.id, req.body);
      this.sendSuccessResponse(res, 200, todoList);
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }

  async deleteItemFromTodoList(req: Request, res: Response) {
    try {
      await todoListService.deleteItemFromTodoList(req.params.id, req.params.itemId);
      this.sendNoContentResponse(res);
    } catch (error: any) {
      this.sendErrorResponse(res, 400, error.message);
    }
  }
}

export default new TodoListController();
