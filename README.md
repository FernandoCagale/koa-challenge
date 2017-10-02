# koa-challenge

[![Build Status][travis-badge]][travis-url]

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

[travis-badge]: https://travis-ci.org/FernandoCagale/koa-challenge.svg?branch=master
[travis-url]: https://travis-ci.org/FernandoCagale/koa-challenge

# Challenge
- [x] Simple model on mongoose
- [x] REST CRUD (create, read, update, delete) for the model created using koajs
- [x] GraphQL Type for the model created, and expose it in a GraphQL endpoint
- [x] Tests using [Jest]
- [x] Authentication JWT
- [x] Docker support


```sh
$ nvm use 8.6.0
```

```sh
$ npm install
```

`Starting MongoDB server`

```sh
$ docker run --name mongo -d -p 27017:27017 mongo
```

```sh
$ npm start
```

```sh
$ npm test
```

`Docker`

```sh
$ docker build --no-cache -t challenge .
```

```sh
$ docker run -d --name challenge -p 8080:3000 challenge
```

### API Documentation

#### `POST` `/v1/login`
- Method: `POST`
- Endpoint: `/v1/login`
- Input:
    The `Content-Type` HTTP header should be set to `application/json`

    ```json
   {
      "user":"koa",
      "password": "password"
   }
    ```
- Responses:
    ```json
   {
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDY5NDg2MDZ9.Q-VI1CKFXYf58TX7p9RV-NSyDR6vAZc6JEO58SIXBrs",
      "message": "Successfully logged in!"
   }
    ```

#### `POST` `/v1/tasks`
- Method: `POST`
- Endpoint: `/v1/tasks`
- Input:
    The `Content-Type` HTTP header should be set to `application/json` and `Authorization Bearer TOKEN`

    ```json
    {
        "description": "API",
        "type": "backend"
    }
    ```
- Responses:
    ```json
    {
        "__v": 0,
        "description": "API",
        "type": "backend",
        "_id": "59d23e3ff3ecdd28a4859675"
    }
    ```

#### `GET` `/v1/tasks`
- Method: `GET`
- Endpoint: `/v1/tasks`
- Input:
    HTTP header should be set `Authorization Bearer TOKEN`
- Responses:
    ```json
    [{
        "__v": 0,
        "description": "API",
        "type": "backend",
        "_id": "59d23e3ff3ecdd28a4859675"
    }]
    ```

#### `GET` `/v1/tasks/:id`
- Method: `GET`
- Endpoint: `/v1/tasks/:id`
- Input:
    HTTP header should be set `Authorization Bearer TOKEN`
- Responses:
    ```json
    {
        "__v": 0,
        "description": "API",
        "type": "backend",
        "_id": "59d23e3ff3ecdd28a4859675"
    }
    ```

#### `PUT` `/v1/tasks/:id`
- Method: `PUT`
- Endpoint: `/v1/tasks/:id`
- Input:
    The `Content-Type` HTTP header should be set to `application/json` and `Authorization Bearer TOKEN`

    ```json
    {
        "description": "Database",
        "type": "DBA"
    }
    ```
- Responses:
    ```json
    {
        "_id": "59d23e3ff3ecdd28a4859675",
        "description": "Database",
        "type": "DBA",
        "__v": 0
    }
    ```

#### `DELETE` `/v1/tasks/:id`
- Method: `DELETE`
- Endpoint: `/v1/tasks/:id`
- Input:
    HTTP header should be set `Authorization Bearer TOKEN`
- Responses:
    ```json
    {
        "ok": true
    }
    ```

#### `GET` `/public/graphql`
- Method: `GET`
- Endpoint: `/public/graphql?query={task{id,type,description}}`
- Responses:
    ```json
    {
        "data":{
            "task":[
                {
                    "id": "59d2410af3ecdd28a4859676",
                    "type": "backend",
                    "description": "API"
                }
            ]
        }
    }
    ```

#### `GET` `/public/graphql`
- Method: `GET`
- Endpoint: `/public/graphql?query={task{id,type}}`
- Responses:
    ```json
    {
        "data":{
            "task":[
                {
                    "id": "59d2410af3ecdd28a4859676",
                    "type": "backend"
                }
            ]
        }
    }
    ```

#### `GET` `/public/graphql`
- Method: `GET`
- Endpoint: `/public/graphql?query={task{type}}`
- Responses:
    ```json
    {
        "data":{
            "task":[
                {
                    "type": "backend"
                }
            ]
        }
    }
    ```

#### `GET` `/public/graphql`
- Method: `GET`
- Endpoint: `/public/graphql?query={task{description}}`
- Responses:
    ```json
    {
        "data":{
            "task":[
                {
                    "description": "API"
                }
            ]
        }
    }
    ```