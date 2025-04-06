-- drop database if exists todo;
-- create database todo;

-- drop database if exists keycloak;
-- create database keycloak;

drop table if exists todo;

create table todo (
  id bigserial primary key,
  email varchar(100) not null,
  title varchar(100) not null,
  done boolean not null default false
);
