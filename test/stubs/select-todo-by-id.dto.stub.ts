import { SelectTodoByIdDtoType } from "src/routes/todos/dto/select-todo-by-id.dto";

export const selectTodoByIdDtoStub = (
	updates: Partial<SelectTodoByIdDtoType> = {}
): SelectTodoByIdDtoType => {
	return Object.assign(
		{
			id: 5,
		},
		updates
	);
};
