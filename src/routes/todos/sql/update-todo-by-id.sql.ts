/**
 * @param $1 id
 * @param $2 description
 * @param $3 completed
 */
export default `--sql
UPDATE "todos"
SET
    "description" = coalesce($2, "description"),
    "completed" = coalesce($3, "completed")
WHERE "id" = $1 RETURNING *
`;
