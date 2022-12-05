import { Static, Type } from "@sinclair/typebox";

export const CreateTodoDto = Type.Object({
	description: Type.String({ maxLength: 255 }),
	completed: Type.Optional(Type.Boolean({ default: false })),
});

export type CreateTodoDtoType = Static<typeof CreateTodoDto>;
