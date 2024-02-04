CREATE TABLE "group"
(
    "id" serial primary key,
    "title" text not null,
    "date_created" timestamp default now(),
    "is_deleted" bool not null default false
);

ALTER TABLE "group"
    OWNER TO root;

CREATE TABLE "to_do"
(
    "id" serial primary key,
    "group_id" integer references "group"("id"),
    "title" text not null,
    "my_day" bool not null,
    "completed" bool not null default false,
    "date_created" timestamp default now(),
    "is_deleted" bool not null default false
);

ALTER TABLE "to_do"
    OWNER TO root;