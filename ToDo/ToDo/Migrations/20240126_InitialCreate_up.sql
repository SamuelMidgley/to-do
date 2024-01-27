CREATE TABLE "Group"
(
    "Id" text not null primary key,
    "Title" text not null 
);

ALTER TABLE "Group"
    OWNER TO root;

CREATE TABLE "ToDo"
(
    "Id" text not null primary key,
    "GroupId" text references "Group"("Id"),
    "Title" text not null,
    "Completed" bool not null default false
);

ALTER TABLE "ToDo"
    OWNER TO root;