
CREATE DATABASE IF NOT EXISTS logback4js;
\c logback4js;
CREATE TABLE IF NOT EXISTS log (
    logger text,
    "timestamp" timestamp,
    "level" varchar(8),
    message text
);
