ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'peepatnice1212';

CREATE DATABASE `nicedb`;

use nicedb;

CREATE TABLE nicedb.equations (
    `idequations` int not null AUTO_INCREMENT,
    `fx` varchar(45) not null,
    primary key (idequations)
);

CREATE TABLE nicedb.poly (
    `idpoly` int not null AUTO_INCREMENT,
    `polycol` varchar(10000) not null,
    `num`  int not null,
    primary key (idpoly)
);

INSERT INTO nicedb.equations(`idequations`,`fx`)
value (1,"x^4-13"),(2,"1/4-x/2");

INSERT INTO nicedb.poly(`idpoly`,`polycol`,`num`)
value (1,'{"numgen":9,"x":[10,15,20,30,40,50,60,70,80],"y":[5,9,15,18,22,30,35,38,43]}"',9),(2,'{"numgen":7,"x":[10,15,20,30,40,50,60],"y":[5,9,15,18,22,30,35]}',7);