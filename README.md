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
sudo docker pull postgres:15.1-alpine # To download postgres image

# Default database - postgres, default user - postgres
sudo docker run -p 5432:5432 \
  --name postgres \
  --env-file .env \
  -d postgres:15.1-alpine

sudo docker rm postgres # To delete container
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

### Sequence diagram

![sequences-backend](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/async-devil/todo-list-app-template/master/docs/sequences-backend.puml)
