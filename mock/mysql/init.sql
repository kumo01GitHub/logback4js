CREATE DATABASE logback4js;
GRANT ALL PRIVILEGES ON logback4js.* TO mysql@'%';
USE logback4js;
CREATE TABLE log (
    logger text,
    timestamp datetime,
    level varchar(8),
    message text
);
