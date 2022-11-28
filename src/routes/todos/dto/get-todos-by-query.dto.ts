import { Type } from "@sinclair/typebox";

export const GetTodosByQueryDto = Type.Object({
	completed: Type.Optional(Type.Boolean()),
	from_date: Type.Optional(Type.Integer({ minimum: 0 })),
	to_date: Type.Optional(Type.Integer({ minimum: 0 })),
});
