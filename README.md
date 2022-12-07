# TODO List App Backend

This is [TODO list application](https://github.com/async-devil/todo-list-app-template) backend.

## Installations and executions

### Run docker compose

```bash
sudo docker compose build
sudo docker compose up
```

### Run postgres docker image

```bash
sudo docker compose up postgres
```

### Local installation

```bash
yarn instal
```

### Local start

```bash
yarn build
yarn start
```

### Test

```bash
yarn test
yarn test:cov
```

### Test at docker container

```bash
sudo docker compose up backend -d

sudo docker exec tla-backend yarn test:cov

sudo docker compose stop backend
```

## Access at

`http://localhost:8080/api/<method>` or `http://127.0.0.1:8080/api/<method>`

## Api routes

- POST `/todos`
- GET `/todos/:id`
- GET `/todos`
- PUT `/todos/:id`
- DELETE `/todos/:id`

## Architecture

### Component diagram

![architecture](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/async-devil/todo-list-app-template/master/docs/architecture.puml)

### Dtos

![structs](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/async-devil/todo-list-app-template/master/docs/structs.puml)

### Sequence diagram

![sequences-backend](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/async-devil/todo-list-app-template/master/docs/sequences-backend.puml)
