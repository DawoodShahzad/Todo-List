import request from 'supertest';
import app from '../src/index';

describe('Shopping List API', () => {
  it('shares a shopping list', async () => {
    const response = await request(app)
      .post('/api/shareList')
      .send({ listId: 'list_id', sharedWith: 'user@example.com', permission: 'read' })
      .set('Authorization', 'Bearer token_here');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Shopping list shared successfully');
  });

  it('gets shared shopping lists', async () => {
    const response = await request(app)
      .get('/api/shareList')
      .set('Authorization', 'Bearer token_here');

    expect(response.status).toBe(200);
    // Add more assertions based on the expected response
  });
});
