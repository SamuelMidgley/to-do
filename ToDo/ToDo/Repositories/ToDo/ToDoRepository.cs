using System.Collections;
using Dapper;
using ToDo.Helpers;
using ToDo.Models;

namespace ToDo.Repositories.ToDo;

public class ToDoRepository(DataContext context) : IToDoRepository
{
    public async Task<ToDoItem> GetToDoById(int id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                    SELECT *
                    FROM "to_do"
                    WHERE "id" = @Id
                    AND "is_deleted" = false
                  """;

        return await connection.QueryFirstAsync<ToDoItem>(sql, new { id });
    }

    public async Task<IEnumerable<ToDoItem>> GetMyDayToDoItems()
    {
        using var connection = context.CreateConnection();

        var sql = """
                    SELECT *
                    FROM "to_do"
                    WHERE "my_day" = true
                  """;

        return await connection.QueryAsync<ToDoItem>(sql);
    }
    
    public async Task<IEnumerable<ToDoItem>> GetAllToDoItems(int groupId)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      SELECT *
                      FROM "to_do"
                      WHERE "group_id" = @groupId
                      AND "is_deleted" = false
                  """;

        var toDos = await connection.QueryAsync<ToDoItem>(sql, new { groupId });

        return toDos;
    }

    public async Task<bool> AddToDoItem(CreateToDoRequest item)
    {
        using var connection = context.CreateConnection();
        string sql;

        if (item.GroupId != null)
        {
            sql = """
                          INSERT INTO "to_do"("title", "my_day", "group_id")
                          VALUES (@Title, @MyDay, @GroupId)
                      """;
        }
        else
        {
            sql = """
                          INSERT INTO "to_do"("title", "my_day")
                          VALUES (@Title, @MyDay)
                      """;
        }
        
        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }

    public async Task<bool> DeleteToDoItem(int id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      UPDATE "to_do"
                      SET "is_deleted" = true
                      WHERE "id" = @id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id });
        
        return result == 1;
    }

    public async Task<bool> UpdateToDoState(int id, bool completed)
    {
        using var connection = context.CreateConnection();

        var sql = """
                        UPDATE "to_do"
                        SET "completed" = @Completed
                        WHERE "id" = @Id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id, completed });

        return result == 1;
    }

    public async Task<bool> UpdateToDoTitle(int id, string title)
    {
        using var connection = context.CreateConnection();

        var sql = """
                        UPDATE "to_do"
                        SET "title" = @Title
                        WHERE "id" = @Id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id, title });

        return result == 1;
    }

    public async Task<bool> DeleteToDosFromGroup(int groupId, bool completed)
    {
        using var connection = context.CreateConnection();

        var sql = """
                    UPDATE "to_do"
                    SET "is_deleted" = true
                    WHERE "group_id" = @groupId
                  """;

        if (completed)
        {
            sql += """
                   AND "Completed" = true;
                   """;
        }

        var result = await connection.ExecuteAsync(sql, new { groupId });

        return result == 1;
    }
}