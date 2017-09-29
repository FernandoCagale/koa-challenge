# koa-challenge

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

`Docker`

```sh
$ docker build --no-cache -t challenge .
```

```sh
$ docker run -d --name challenge -p 8080:3000 challenge
```

```sh
$ http://localhost:8080/v1/tasks
```