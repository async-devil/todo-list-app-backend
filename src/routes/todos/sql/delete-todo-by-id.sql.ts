/**
 * @param $1 id
 */
export default `--sql
DELETE FROM "todos" WHERE "id" = $1 
`;
