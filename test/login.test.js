const server = require('../server');
const request = require('supertest');

afterAll(() => {
  server.close();
});

describe('Login', () => {
  describe('routes: POST', () => {
    test('login Successfully', async () => {
      const response = await request(server)
        .post('/v1/login')
        .send({user: 'koa', password: 'password'});

      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.message).toEqual('Successfully logged in!');
      expect(response.body.token).not.toBeUndefined();
    });

    test('login invalid', async () => {
      const response = await request(server)
        .post('/v1/login')
        .send({user: 'koa', password: 'invalid'});

      expect(response.status).toEqual(401);
      expect(response.type).toEqual('application/json');
      expect(response.body.message).toEqual('Authentication failed');
    });
  });
});