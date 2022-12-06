import fastify from "fastify";
import { NotFound, InternalServerError } from "http-errors";

import { TodosRepository } from "src/routes/todos/todos.repository";
import { pgClientMock } from "test/mocks/pg-client.mock";
import { createTodoDtoStub } from "test/stubs/create-todo.dto.stub";
import { getTodosByQueryDtoStub } from "test/stubs/get-todos-by-query.dto.stub";
import { selectTodoByIdDtoStub } from "test/stubs/select-todo-by-id.dto.stub";
import { todoEntityStub } from "test/stubs/todo.entity.stub";
import { updateTodoDtoStub } from "test/stubs/update-todo.dto.stub";

describe("Todos repository", () => {
	const app = fastify();
	let repository: TodosRepository;

	beforeEach(() => {
		repository = new TodosRepository(Object.assign(app, { pg: { connect: () => pgClientMock } }));
	});

	describe("Create method", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [todoEntityStub()] });

			const result = await repository.create(createTodoDtoStub());

			expect(result).toEqual(todoEntityStub());
		});

		test("Should throw InternalServerError on unknown error", async () => {
			jest
				.spyOn(pgClientMock, "query")
				.mockRejectedValueOnce(new Error("Something weird had happened"));

			await expect(repository.create(createTodoDtoStub())).rejects.toThrow(InternalServerError);
		});
	});

	describe("Get one by id method", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [todoEntityStub()] });

			const result = await repository.getOneById(selectTodoByIdDtoStub().id);

			expect(result).toEqual(todoEntityStub());
		});

		test("Should throw NotFoundError on non found todo", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [] });

			await expect(repository.getOneById(6)).rejects.toThrow(NotFound);
		});

		test("Should throw InternalServerError on unknown error", async () => {
			jest
				.spyOn(pgClientMock, "query")
				.mockRejectedValueOnce(new Error("Something weird had happened"));

			await expect(repository.getOneById(selectTodoByIdDtoStub().id)).rejects.toThrow(
				InternalServerError
			);
		});
	});

	describe("Get many by query method", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [todoEntityStub()] });

			const result = await repository.getManyByQuery(getTodosByQueryDtoStub());

			expect(result).toEqual([todoEntityStub()]);
		});

		test("Should throw InternalServerError on unknown error", async () => {
			jest
				.spyOn(pgClientMock, "query")
				.mockRejectedValueOnce(new Error("Something weird had happened"));

			await expect(repository.getManyByQuery(getTodosByQueryDtoStub())).rejects.toThrow(
				InternalServerError
			);
		});
	});

	describe("Update by id method", () => {
		test("Should return valid value on valid query", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [todoEntityStub()] });

			const result = await repository.updateById(selectTodoByIdDtoStub().id, updateTodoDtoStub());

			expect(result).toEqual(todoEntityStub());
		});

		test("Should throw NotFoundError on non found todo", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({ rows: [] });

			await expect(
				repository.updateById(selectTodoByIdDtoStub().id, updateTodoDtoStub())
			).rejects.toThrow(NotFound);
		});

		test("Should throw InternalServerError on unknown error", async () => {
			jest
				.spyOn(pgClientMock, "query")
				.mockRejectedValueOnce(new Error("Something weird had happened"));

			await expect(
				repository.updateById(selectTodoByIdDtoStub().id, updateTodoDtoStub())
			).rejects.toThrow(InternalServerError);
		});
	});

	describe("Delete by id method", () => {
		test("Should execute without errors on valid query", async () => {
			jest.spyOn(pgClientMock, "query").mockResolvedValueOnce({});

			await expect(repository.deleteById(selectTodoByIdDtoStub().id)).resolves.toBeUndefined();
		});

		test("Should throw InternalServerError on unknown error", async () => {
			jest
				.spyOn(pgClientMock, "query")
				.mockRejectedValueOnce(new Error("Something weird had happened"));

			await expect(repository.deleteById(selectTodoByIdDtoStub().id)).rejects.toThrow(
				InternalServerError
			);
		});
	});
});
