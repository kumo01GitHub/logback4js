CREATE DATABASE logback4js;
\c logback4js;
CREATE TABLE log (
    logger text,
    "timestamp" timestamp,
    "level" varchar(8),
    message text
);
