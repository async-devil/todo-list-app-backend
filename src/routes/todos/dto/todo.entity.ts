import { Type } from "@sinclair/typebox";

export const TodoEntity = Type.Object({
	id: Type.Integer({ minimum: 1 }),
	description: Type.String({ maxLength: 255 }),
	completed: Type.Boolean(),
	create_date: Type.Integer({ minimum: 0 }),
});
