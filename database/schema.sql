set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."movies" (
  "movieId"      serial,
  "title"        text           not null,
  "summary"      text           not null,
  "linkToIMDB"  text           not null,
  "rating"     numeric(2, 1) not null check ("rating" >= 0 and "rating" <= 5),
  primary key ("movieId")
);