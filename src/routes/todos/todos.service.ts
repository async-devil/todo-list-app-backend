import { FastifyInstance } from "fastify";

import { CreateTodoDtoType } from "./dto/create-todo.dto";
import { GetTodosByQueryDtoType } from "./dto/get-todos-by-query.dto";
import { SelectTodoByIdDtoType } from "./dto/select-todo-by-id.dto";
import { UpdateTodoDtoType } from "./dto/update-todo.dto";
import { TodosRepository } from "./todos.repository";

export class TodosService {
	constructor(private readonly server: FastifyInstance) {}

	private readonly repository = new TodosRepository(this.server);

	public async createTodo(dto: CreateTodoDtoType) {
		return await this.repository.create(dto);
	}

	public async getTodoById(dto: SelectTodoByIdDtoType) {
		return await this.repository.getOneById(dto.id);
	}

	public async getTodosByQuery(dto: GetTodosByQueryDtoType) {
		return await this.repository.getManyByQuery(dto);
	}

	public async updateTodoById(idDto: SelectTodoByIdDtoType, dto: UpdateTodoDtoType) {
		return await this.repository.updateById(idDto.id, dto);
	}

	public async deleteTodoById(dto: SelectTodoByIdDtoType) {
		return await this.repository.deleteById(dto.id);
	}
}
