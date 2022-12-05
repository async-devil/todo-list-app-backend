import { Static, Type } from "@sinclair/typebox";

export const SelectTodoByIdDto = Type.Object({
	id: Type.Number({ minimum: 1 }),
});

export type SelectTodoByIdDtoType = Static<typeof SelectTodoByIdDto>;
