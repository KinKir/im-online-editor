-- create database

CREATE DATABASE IF NOT EXISTS im_user;

USE im_user;

-- create tables

CREATE TABLE IF NOT EXISTS registry(
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
    user_pw VARCHAR(6) NOT NULL,
    PRIMARY KEY(id)
);
