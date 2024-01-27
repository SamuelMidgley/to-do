ALTER TABLE "ToDo"
ADD COLUMN "GroupId" text references "Group"("Id")