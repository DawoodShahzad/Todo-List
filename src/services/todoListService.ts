// todoListService.ts
import todoListRepository from '../repositories/todoListRepository';
import { TodoItem } from '../models/TodoList';

class TodoListService {
  async createTodoList(todoListData: any): Promise<any> {
    return await todoListRepository.createTodoList(todoListData);
  }

  async getTodoListById(todoListId: string): Promise<any> {
    return await todoListRepository.getTodoListById(todoListId);
  }

  async updateTodoList(todoListId: string, todoListData: any): Promise<any> {
    return await todoListRepository.updateTodoList(todoListId, todoListData);
  }

  async deleteTodoList(todoListId: string): Promise<void> {
    await todoListRepository.deleteTodoList(todoListId);
  }

  async addItemToTodoList(todoListId: string, todoItem: TodoItem): Promise<any> {
    return await todoListRepository.addItemToTodoList(todoListId, todoItem);
  }

  async deleteItemFromTodoList(todoListId: string, itemId: string): Promise<void> {
    await todoListRepository.deleteItemFromTodoList(todoListId, itemId);
  }
}

export default new TodoListService();