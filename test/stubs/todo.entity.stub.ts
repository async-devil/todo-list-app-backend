import { TodoEntityType } from "src/routes/todos/dto/todo.entity";

export const todoEntityStub = (updates: Partial<TodoEntityType> = {}): TodoEntityType => {
	return Object.assign(
		{
			id: 5,
			description: "Complete task",
			completed: false,
			create_date: new Date("2022-06-12").getTime(),
		},
		updates
	);
};
