SELECT
    ID,
    FIRST_NAME,
    LAST_NAME,
    ADDRESS,
    DATE_CREATED
FROM
    USERS
WHERE
    ID = ?
;