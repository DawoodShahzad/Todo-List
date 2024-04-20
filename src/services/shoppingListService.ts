import shoppingListRepository from '../repositories/shoppingListRepository';

const shoppingListService = {
  async shareList(listId: string, sharedWith: string, permission: string) {
    await shoppingListRepository.shareList(listId, sharedWith, permission);
  },

  async getSharedLists(userId: string) {
    return await shoppingListRepository.getSharedLists(userId);
  }
};

export default shoppingListService;
