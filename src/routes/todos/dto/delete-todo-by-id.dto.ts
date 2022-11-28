import { Type } from "@sinclair/typebox";

export const DeleteTodoByIdDto = Type.Object({
	id: Type.Number({ minimum: 1 }),
});
