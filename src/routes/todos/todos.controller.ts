import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

import { CreateTodoDto } from "./dto/create-todo.dto";
import { GetTodosByQueryDto } from "./dto/get-todos-by-query.dto";
import { SelectTodoByIdDto } from "./dto/select-todo-by-id.dto";
import { TodoEntity } from "./dto/todo.entity";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodosService } from "./todos.service";

export const autoPrefix = "/todos";

const TodosController: FastifyPluginAsyncTypebox = async (server) => {
	const service = new TodosService(server);

	server.post(
		"/",
		{
			schema: {
				body: CreateTodoDto,
				response: {
					201: TodoEntity,
				},
			},
		},
		async (request, response) => {
			const result = await service.createTodo(request.body);

			return response.code(201).send(result);
		}
	);

	server.get(
		"/:id",
		{
			schema: {
				params: SelectTodoByIdDto,
				response: {
					200: TodoEntity,
				},
			},
		},
		async (request) => {
			return await service.getTodoById(request.params);
		}
	);

	server.get(
		"/",
		{
			schema: {
				querystring: GetTodosByQueryDto,
				response: {
					200: Type.Array(TodoEntity),
				},
			},
		},
		async (request) => {
			return await service.getTodosByQuery(request.query);
		}
	);

	server.put(
		"/:id",
		{
			schema: {
				params: SelectTodoByIdDto,
				body: UpdateTodoDto,
				response: {
					200: TodoEntity,
				},
			},
		},
		async (request) => {
			return await service.updateTodoById(request.params, request.body);
		}
	);

	server.delete(
		"/:id",
		{
			schema: {
				params: SelectTodoByIdDto,
				response: {
					204: Type.Void(),
				},
			},
		},
		async (request, response) => {
			await service.deleteTodoById(request.params);

			return response.code(204).send();
		}
	);
};

export default TodosController;
