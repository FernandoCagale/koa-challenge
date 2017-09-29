# koa-challenge

[![Build Status][travis-badge]][travis-url]

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

[travis-badge]: https://travis-ci.org/FernandoCagale/koa-challenge.svg?branch=master
[travis-url]: https://travis-ci.org/FernandoCagale/koa-challenge


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

```sh
$ http://localhost:8080/v1/tasks
```