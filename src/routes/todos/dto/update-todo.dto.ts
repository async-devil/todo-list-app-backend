import { Static, Type } from "@sinclair/typebox";

export const UpdateTodoDto = Type.Object({
	description: Type.Optional(Type.String({ maxLength: 255 })),
	completed: Type.Optional(Type.Boolean()),
});

export type UpdateTodoDtoType = Static<typeof UpdateTodoDto>;
