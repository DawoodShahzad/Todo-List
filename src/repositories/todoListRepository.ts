import TodoList, { TodoItem } from '../models/TodoList';

const todoListRepository = {
    
  async createTodoList(todoListData: any) {
    try {
      const newTodoList = new TodoList(todoListData);
      await newTodoList.save();
      return newTodoList;
    } catch (error) {
      throw new Error('Error creating todo list');
    }
  },

  async getTodoListById(todoListId: string) {
    try {
      const todoList = await TodoList.findById(todoListId);
      return todoList;
    } catch (error) {
      throw new Error('Error fetching todo list by ID');
    }
  },

  async updateTodoList(todoListId: string, todoListData: any) {
    try {
      const updatedTodoList = await TodoList.findByIdAndUpdate(todoListId, todoListData, { new: true });
      return updatedTodoList;
    } catch (error) {
      throw new Error('Error updating todo list');
    }
  },

  async deleteTodoList(todoListId: string) {
    try {
      await TodoList.findByIdAndDelete(todoListId);
    } catch (error) {
      throw new Error('Error deleting todo list');
    }
  },

  async addItemToTodoList(todoListId: string, todoItem: TodoItem) {
    try {
      const todoList = await TodoList.findById(todoListId);
      if (!todoList) {
        throw new Error('Todo list not found');
      }
      todoList.items.push(todoItem);
      await todoList.save();
      return todoList;
    } catch (error) {
      throw new Error('Error adding item to todo list');
    }
  },

  async deleteItemFromTodoList(todoListId: string, itemId: string) {
    try {
      const todoList = await TodoList.findById(todoListId);
      if (!todoList) {
        throw new Error('Todo list not found');
      }
      todoList.items = todoList.items.filter(item => item.id.toString() !== itemId);
      await todoList.save();
    } catch (error) {
      throw new Error('Error deleting item from todo list');
    }
  },
};

export default todoListRepository;
