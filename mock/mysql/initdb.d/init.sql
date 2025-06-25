CREATE DATABASE logback4js;
CREATE USER 'mysql'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON logback4js.* TO 'mysql'@'localhost';
USE logback4js;
CREATE TABLE log (
    logger text,
    timestamp datetime,
    level varchar(8),
    message text
);
