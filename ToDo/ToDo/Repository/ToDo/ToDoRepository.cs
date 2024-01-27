using Dapper;
using ToDo.Helpers;
using ToDo.Models;

namespace ToDo.Repository.ToDo;

public class ToDoRepository(DataContext context) : IToDoRepository
{
    public async Task<IEnumerable<ToDoItem>> GetAllToDoItems(string groupId)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      SELECT *
                      FROM "ToDo"
                      WHERE "GroupId" = @groupId
                  """;

        var toDos = await connection.QueryAsync<ToDoItem>(sql, new { groupId });

        return toDos;
    }

    public async Task<bool> AddToDoItem(ToDoItem item)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      INSERT INTO "ToDo"
                      VALUES (@Id, @Title, false, @GroupId)
                  """;

        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }

    public async Task<bool> DeleteToDoItem(string id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      DELETE FROM "ToDo"
                      WHERE "Id" = @id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id });
        
        return result == 1;
    }

    public async Task<bool> UpdateToDoItem(ToDoItem item)
    {
        using var connection = context.CreateConnection();
        
        var sql = """
                      UPDATE "ToDo"
                      SET "Title" = @Title,
                          "Completed" = @Completed
                      WHERE "Id" = @Id
                  """;
        
        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }

    public async Task<bool> UpdateToDoState(string id, bool completed)
    {
        using var connection = context.CreateConnection();

        var sql = """
                        UPDATE "ToDo"
                        SET "Completed" = @Completed
                        WHERE "Id" = @Id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id, completed });

        return result == 1;
    }

    public async Task<bool> UpdateToDoTitle(string id, string title)
    {
        using var connection = context.CreateConnection();

        var sql = """
                        UPDATE "ToDo"
                        SET "Title" = @Title
                        WHERE "Id" = @Id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id, title });

        return result == 1;
    }
}