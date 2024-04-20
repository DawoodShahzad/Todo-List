import express from 'express';
import shoppingListController from '../controllers/shoppingListController';
import authenticateToken from '../middlewares/authenticateToken';

const app = express.Router();

app.post('/shareList', authenticateToken, shoppingListController.shareList);
app.get('/shareList', authenticateToken, shoppingListController.getSharedLists);

export default app;