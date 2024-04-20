import mongoose, { Document } from 'mongoose';

interface IShoppingList extends Document {
  userId: string;
  items: string[];
  sharedWith: { email: string; permission: string }[];
}

const ShoppingListSchema = new mongoose.Schema({
  userId: String,
  items: [String],
  sharedWith: [{ email: String, permission: String }]
});

const ShoppingList = mongoose.model<IShoppingList>('ShoppingList', ShoppingListSchema);

export default ShoppingList;
