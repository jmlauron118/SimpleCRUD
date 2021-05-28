INSERT
INTO
    USERS
(
    FIRST_NAME,
    LAST_NAME,
    ADDRESS,
    DATE_CREATED
)
VALUES
(
    ?,
    ?,
    ?,
    datetime(CURRENT_TIMESTAMP, 'localtime')
);