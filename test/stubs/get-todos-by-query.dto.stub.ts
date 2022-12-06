import { GetTodosByQueryDtoType } from "src/routes/todos/dto/get-todos-by-query.dto";

export const getTodosByQueryDtoStub = (
	updates: Partial<GetTodosByQueryDtoType> = {}
): GetTodosByQueryDtoType => {
	return Object.assign(
		{
			completed: false,
			search: "Comp",
		},
		updates
	);
};
