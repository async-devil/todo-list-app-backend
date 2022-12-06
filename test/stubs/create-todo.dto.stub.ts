import { CreateTodoDtoType } from "src/routes/todos/dto/create-todo.dto";

export const createTodoDtoStub = (updates: Partial<CreateTodoDtoType> = {}): CreateTodoDtoType => {
	return Object.assign(
		{
			description: "Complete task",
			completed: false,
		},
		updates
	);
};
