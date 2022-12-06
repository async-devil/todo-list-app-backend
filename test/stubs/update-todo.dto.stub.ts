import { UpdateTodoDtoType } from "src/routes/todos/dto/update-todo.dto";

export const updateTodoDtoStub = (): UpdateTodoDtoType => {
	return {
		completed: true,
	};
};
