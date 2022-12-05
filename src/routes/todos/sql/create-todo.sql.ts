/**
 * @param $1 description
 * @param $2 completed
 */
export default `--sql
INSERT INTO
    "todos" ("description", "completed")
VALUES ($1, $2) RETURNING *
`;
