import { Type } from "@sinclair/typebox";

export const UpdateTodoByIdDto = Type.Object({
	description: Type.Optional(Type.String({ maxLength: 255 })),
	completed: Type.Optional(Type.Boolean()),
});
