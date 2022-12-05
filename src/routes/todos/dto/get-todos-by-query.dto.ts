import { Static, Type } from "@sinclair/typebox";

export const GetTodosByQueryDto = Type.Object({
	completed: Type.Optional(Type.Boolean()),
	search: Type.Optional(Type.String({ maxLength: 255 })),
	from_date: Type.Optional(Type.Integer({ minimum: 0 })),
	to_date: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type GetTodosByQueryDtoType = Static<typeof GetTodosByQueryDto>;
