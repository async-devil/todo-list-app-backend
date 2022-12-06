import fastify from "fastify";
import { NotFound } from "http-errors";

import TodosController from "src/routes/todos/todos.controller";
import { TodosService } from "src/routes/todos/todos.service";
import { createTodoDtoStub } from "test/stubs/create-todo.dto.stub";
import { getTodosByQueryDtoStub } from "test/stubs/get-todos-by-query.dto.stub";
import { selectTodoByIdDtoStub } from "test/stubs/select-todo-by-id.dto.stub";
import { todoEntityStub } from "test/stubs/todo.entity.stub";
import { updateTodoDtoStub } from "test/stubs/update-todo.dto.stub";

describe("Todos controller", () => {
	const app = fastify();

	beforeAll(async () => {
		void app.register(TodosController, {});
		await app.ready();
	});

	afterAll(() => app.close());

	describe("Create todo route", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(TodosService.prototype, "createTodo").mockResolvedValueOnce(todoEntityStub());

			const result = await app.inject({
				method: "POST",
				url: "/",
				payload: createTodoDtoStub(),
			});

			expect(TodosService.prototype.createTodo).toBeCalledWith(createTodoDtoStub());
			expect(result.statusCode).toBe(201);
			expect(JSON.parse(result.payload)).toEqual(todoEntityStub());
		});

		test("Should return 400 on non valid query", async () => {
			const result = await app.inject({
				method: "POST",
				url: "/",
				payload: { description: ["this", "isn't", "a valid id"] },
			});

			expect(result.statusCode).toBe(400);
		});
	});

	describe("Get todo by id route", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(TodosService.prototype, "getTodoById").mockResolvedValueOnce(todoEntityStub());

			const query = selectTodoByIdDtoStub();

			const result = await app.inject({
				method: "GET",
				url: `/${query.id}`,
			});

			expect(TodosService.prototype.getTodoById).toBeCalledWith(query);
			expect(JSON.parse(result.payload)).toEqual(todoEntityStub());
		});

		test("Should return 404 on nonexisting todo", async () => {
			jest.spyOn(TodosService.prototype, "getTodoById").mockRejectedValueOnce(new NotFound());

			const result = await app.inject({
				method: "GET",
				url: "/6",
			});

			expect(result.statusCode).toBe(404);
		});

		test("Should return 400 on non valid query", async () => {
			const result = await app.inject({
				method: "GET",
				url: "/text-id",
			});

			expect(result.statusCode).toBe(400);
		});
	});

	describe("Get todos by query route", () => {
		test("Should return valid value on valid query", async () => {
			jest
				.spyOn(TodosService.prototype, "getTodosByQuery")
				.mockResolvedValueOnce([todoEntityStub()]);

			const query = getTodosByQueryDtoStub();

			const result = await app.inject({
				method: "GET",
				url: `/?completed=${String(query.completed)}&search=${query.search}`,
			});

			expect(TodosService.prototype.getTodosByQuery).toBeCalledWith(query);
			expect(JSON.parse(result.payload)).toEqual([todoEntityStub()]);
		});

		test("Should return 400 on non valid query", async () => {
			const result = await app.inject({
				method: "GET",
				url: "/?completed=maybe",
			});

			expect(result.statusCode).toBe(400);
		});
	});

	describe("Update todo route", () => {
		test("Should return valid value on valid query", async () => {
			jest
				.spyOn(TodosService.prototype, "updateTodoById")
				.mockResolvedValueOnce(todoEntityStub({ completed: true }));

			const query = selectTodoByIdDtoStub();

			const result = await app.inject({
				method: "PUT",
				url: `/${query.id}`,
				payload: updateTodoDtoStub(),
			});

			expect(TodosService.prototype.updateTodoById).toBeCalledWith(query, updateTodoDtoStub());
			expect(JSON.parse(result.payload)).toEqual(todoEntityStub({ completed: true }));
		});

		test("Should return 404 on nonexisting todo", async () => {
			jest.spyOn(TodosService.prototype, "updateTodoById").mockRejectedValueOnce(new NotFound());

			const result = await app.inject({
				method: "PUT",
				url: "/6",
				payload: {},
			});

			expect(result.statusCode).toBe(404);
		});

		test("Should return 400 on non valid query", async () => {
			const result = await app.inject({
				method: "PUT",
				url: "/5",
				payload: { completed: "maybe" },
			});

			expect(result.statusCode).toBe(400);
		});
	});

	describe("Delete todo route", () => {
		test("Should return 204 on valid query", async () => {
			jest.spyOn(TodosService.prototype, "deleteTodoById").mockResolvedValueOnce();

			const query = selectTodoByIdDtoStub();

			const result = await app.inject({
				method: "DELETE",
				url: `/${query.id}`,
			});

			expect(TodosService.prototype.deleteTodoById).toBeCalledWith(query);
			expect(result.statusCode).toEqual(204);
		});

		test("Should return 400 on non valid query", async () => {
			const result = await app.inject({
				method: "DELETE",
				url: "/text-id",
			});

			expect(result.statusCode).toBe(400);
		});
	});
});
