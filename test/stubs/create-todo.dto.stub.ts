import { CreateTodoDtoType } from "src/routes/todos/dto/create-todo.dto";

export const createTodoDtoStub = (): CreateTodoDtoType => {
	return {
		description: "Complete task",
		completed: false,
	};
};
