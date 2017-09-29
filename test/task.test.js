const server = require('../server');
const request = require('supertest');

let _id;

afterAll(() => {
  server.close();
});

describe('Tasks', () => {
  describe('routes: POST', () => {
    test('save Task', async () => {
      const response = await request(server).post('/v1/tasks').send({description: 'web', type: 'development'});
      expect(response.status).toEqual(201);
      expect(response.type).toEqual('application/json');
      expect(response.body.description).toEqual('web');
      expect(response.body.type).toEqual('development');
      _id = response.body._id;
    });
  });

  describe('routes: GET all', () => {
    test('all Task', async () => {
      const response = await request(server).get('/v1/tasks');
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].description).toEqual('web');
      expect(response.body[0].type).toEqual('development');
      expect(response.body[0]._id).toEqual(_id);
    });
  });

  describe('routes: GET id', () => {
    test('get id Task', async () => {
      const response = await request(server).get(`/v1/tasks/${_id}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.description).toEqual('web');
      expect(response.body.type).toEqual('development');
    });

    test('get id not found', async () => {
      const response = await request(server).get(`/v1/tasks/59ce75943ffd0b260056b44a`);
      expect(response.body.output.statusCode).toEqual(404);
      expect(response.body.output.payload.error).toEqual('Not Found');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('routes: PUT id', () => {
    test('update id Task', async () => {
      const response = await request(server).put(`/v1/tasks/${_id}`).send({description: 'database', type: 'dba'});
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.description).toEqual('database');
      expect(response.body.type).toEqual('dba');
    });

    test('update id not found', async () => {
      const response = await request(server).put(`/v1/tasks/59ce75943ffd0b260056b44a`).send({description: 'database', type: 'dba'});
      expect(response.body.output.statusCode).toEqual(404);
      expect(response.body.output.payload.error).toEqual('Not Found');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('graphql', () => {
    test('all fields Task', async () => {
      const response = await request(server).get(`/v1/graphql?query={task{id,type,description}}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body.data.task)).toBe(true);
      expect(response.body.data.task[0].description).toEqual('database');
      expect(response.body.data.task[0].type).toEqual('dba');
      expect(response.body.data.task[0].id).toEqual(_id);
    });

    test('fields id Task', async () => {
      const response = await request(server).get(`/v1/graphql?query={task{id}}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body.data.task)).toBe(true);
      expect(response.body.data.task[0].id).toEqual(_id);
      expect(response.body.data.task[0].description).toBeUndefined();
      expect(response.body.data.task[0].type).toBeUndefined();
    });

    test('fields id, type Task', async () => {
      const response = await request(server).get(`/v1/graphql?query={task{id,type}}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body.data.task)).toBe(true);
      expect(response.body.data.task[0].id).toEqual(_id);
      expect(response.body.data.task[0].type).toEqual('dba');
      expect(response.body.data.task[0].description).toBeUndefined();
    });

    test('fields id, description Task', async () => {
      const response = await request(server).get(`/v1/graphql?query={task{id,description}}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body.data.task)).toBe(true);
      expect(response.body.data.task[0].id).toEqual(_id);
      expect(response.body.data.task[0].description).toEqual('database');
      expect(response.body.data.task[0].type).toBeUndefined();
    }); 

    test('fields type, description Task', async () => {
      const response = await request(server).get(`/v1/graphql?query={task{type,description}}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(Array.isArray(response.body.data.task)).toBe(true);
      expect(response.body.data.task[0].description).toEqual('database');
      expect(response.body.data.task[0].type).toEqual('dba');
      expect(response.body.data.task[0].id).toBeUndefined();
    });
  });

  describe('routes: DELETE id', () => {
    test('delete id Task', async () => {
      const response = await request(server).delete(`/v1/tasks/${_id}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.ok).toEqual(true);
    });

    test('delete id not found', async () => {
      const response = await request(server).delete(`/v1/tasks/59ce75943ffd0b260056b44a`);
      expect(response.body.output.statusCode).toEqual(404);
      expect(response.body.output.payload.error).toEqual('Not Found');
      expect(response.type).toEqual('application/json');
    });
  });
});
