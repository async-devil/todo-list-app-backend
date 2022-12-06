import { QueryResult } from "pg";

type Response = Partial<QueryResult<unknown>>;

export const pgClientMock = {
	release: jest.fn(),
	query: jest.fn<Promise<Response>, []>(),
};
