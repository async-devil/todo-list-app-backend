import { FastifyInstance } from "fastify";
import { NotFound, InternalServerError } from "http-errors";

import { CreateTodoDtoType } from "./dto/create-todo.dto";
import { GetTodosByQueryDtoType } from "./dto/get-todos-by-query.dto";
import { TodoEntityType } from "./dto/todo.entity";
import { UpdateTodoDtoType } from "./dto/update-todo.dto";
import createTodoSql from "./sql/create-todo.sql";
import deleteTodoByIdSql from "./sql/delete-todo-by-id.sql";
import getTodoByIdSql from "./sql/get-todo-by-id.sql";
import getTodosByQuerySql from "./sql/get-todos-by-query.sql";
import updateTodoByIdSql from "./sql/update-todo-by-id.sql";

export class TodosRepository {
	constructor(private readonly server: FastifyInstance) {}

	public async create(dto: CreateTodoDtoType) {
		const client = await this.server.pg.connect();

		try {
			const { rows } = await client.query<TodoEntityType>(createTodoSql, [
				dto.description,
				dto.completed || false,
			]);

			return rows[0];
		} catch (err) {
			throw new InternalServerError();
		} finally {
			client.release();
		}
	}

	public async getOneById(id: number) {
		const client = await this.server.pg.connect();

		try {
			const { rows } = await client.query<TodoEntityType>(getTodoByIdSql, [id]);

			if (rows.length === 0) throw new NotFound("Todo not found");

			return rows[0];
		} catch (err) {
			const error = err as Error;

			if (error.name === "NotFoundError") throw error;

			throw new InternalServerError();
		} finally {
			client.release();
		}
	}

	public async getManyByQuery(dto: GetTodosByQueryDtoType) {
		const client = await this.server.pg.connect();

		try {
			const { rows } = await client.query<TodoEntityType>(getTodosByQuerySql, [
				dto.completed || null,
				dto.search || null,
				dto.from_date || null,
				dto.to_date || null,
			]);

			return rows;
		} catch (err) {
			throw new InternalServerError();
		} finally {
			client.release();
		}
	}

	public async updateById(id: number, dto: UpdateTodoDtoType) {
		const client = await this.server.pg.connect();

		try {
			const { rows } = await client.query<TodoEntityType>(updateTodoByIdSql, [
				id,
				dto.description || null,
				dto.completed || null,
			]);

			if (rows.length === 0) throw new NotFound("Todo not found");

			return rows[0];
		} catch (err) {
			const error = err as Error;

			if (error.name === "NotFoundError") throw error;

			throw new InternalServerError();
		} finally {
			client.release();
		}
	}

	public async deleteById(id: number) {
		const client = await this.server.pg.connect();

		try {
			await client.query<TodoEntityType>(deleteTodoByIdSql, [id]);
		} catch (err) {
			throw new InternalServerError();
		} finally {
			client.release();
		}
	}
}
