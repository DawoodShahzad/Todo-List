// userController.test.ts
import request from 'supertest';
import app from '../index';

describe('User Controller', () => {
  it('should login user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'user1@example.com', password: 'password1' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should sign up user', async () => {
    const response = await request(app)
      .post('/api/signup')
      .field('email', 'user1@example.com')
      .field('password', 'password1')
      .attach('profilePicture', 'path/to/profile-picture.jpg');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should update user profile', async () => {
    const response = await request(app)
      .put('/api/profile')
      .set('Authorization', 'Bearer YOUR_JWT_TOKEN')
      .send({ name: 'New Name', age: 30 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'New Name');
    expect(response.body).toHaveProperty('age', 30);
  });
});

describe('Todo List Controller', () => {
  let token: string;
  let todoListId: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ email: 'user1@example.com', password: 'password1' });

    token = loginResponse.body.token;
  });

  it('should create todo list', async () => {
    const response = await request(app)
      .post('/api')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Todo List', items: [] });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'My Todo List');
    todoListId = response.body._id;
  });

  it('should get todo list by ID', async () => {
    const response = await request(app)
      .get(`/api/${todoListId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });

  it('should update todo list', async () => {
    const response = await request(app)
      .put(`/api/${todoListId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Todo List' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Todo List');
  });

  it('should delete todo list', async () => {
    const response = await request(app)
      .delete(`/api/${todoListId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should add item to todo list', async () => {
    const response = await request(app)
      .post(`/api/${todoListId}/items`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Do something', completed: false });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('description', 'Do something');
  });

  it('should delete item from todo list', async () => {
    const response = await request(app)
      .delete(`/api/${todoListId}/items/ITEM_ID`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
