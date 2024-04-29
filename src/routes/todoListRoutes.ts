// todoListRoutes.ts
import express from 'express';
import todoListController from '../controllers/todoListController';
import authenticateToken from '../middlewares/authenticateToken';

const app = express.Router();

app.post('/', authenticateToken, todoListController.createTodoList);
app.get('/:id', authenticateToken, todoListController.getTodoListById);
app.put('/:id', authenticateToken, todoListController.updateTodoList);
app.delete('/:id', authenticateToken, todoListController.deleteTodoList);
app.post('/:id/items', authenticateToken, todoListController.addItemToTodoList);
app.delete('/:id/items/:itemId', authenticateToken, todoListController.deleteItemFromTodoList);

export default app;