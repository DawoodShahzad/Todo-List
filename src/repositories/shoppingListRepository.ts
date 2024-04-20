import ShoppingList from '../models/ShoppingList';

const shoppingListRepository = {
  async shareList(listId: string, sharedWith: string, permission: string) {
    const list = await ShoppingList.findById(listId);
    if (!list) throw new Error('Shopping list not found');

    list.sharedWith.push({ email: sharedWith, permission });
    await list.save();
  },

  async getSharedLists(userId: string) {
    return await ShoppingList.find({ 'sharedWith.email': userId });
  }
};

export default shoppingListRepository;
