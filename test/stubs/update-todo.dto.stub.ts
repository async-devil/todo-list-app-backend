import { UpdateTodoDtoType } from "src/routes/todos/dto/update-todo.dto";

export const updateTodoDtoStub = (updates: Partial<UpdateTodoDtoType> = {}): UpdateTodoDtoType => {
	return Object.assign(
		{
			completed: true,
		},
		updates
	);
};
