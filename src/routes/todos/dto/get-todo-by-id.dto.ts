import { Type } from "@sinclair/typebox";

export const GetTodoByIdDto = Type.Object({
	id: Type.Number({ minimum: 1 }),
});
