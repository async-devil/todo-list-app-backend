import { GetTodosByQueryDtoType } from "src/routes/todos/dto/get-todos-by-query.dto";

export const getTodosByQueryDtoStub = (): GetTodosByQueryDtoType => {
	return {
		completed: false,
		search: "Comp",
	};
};
