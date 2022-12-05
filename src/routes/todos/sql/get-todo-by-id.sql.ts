/**
 * @param $1 id
 */
export default `--sql
SELECT * FROM "todos" WHERE "id" = $1 
`;
