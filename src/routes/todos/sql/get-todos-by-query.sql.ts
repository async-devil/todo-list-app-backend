/**
 * @param $1 completed
 * @param $2 search
 * @param $3 from_date
 * @param $4 to_date
 */
export default `--sql
SELECT *
FROM "todos"
WHERE (
        "completed" = $1
        OR $1 IS NULL
    )
    AND (
        "description" ILIKE '%' || $2 || '%'
        OR $2 IS NULL
    )
    AND (
        "create_date" >= $3
        OR $3 IS NULL
    )
    AND (
        "create_date" <= $4
        OR $4 IS NULL
    )
`;
