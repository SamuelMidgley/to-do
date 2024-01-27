using Dapper;
using ToDo.Helpers;
using ToDo.Models;

namespace ToDo.Repository.Group;

public class GroupRepository(DataContext context) : IGroupRepository
{
    public async Task<IEnumerable<GroupItemIncComplete>> GetAll()
    {
        using var connection = context.CreateConnection();

        var sql = """
                      SELECT
                          G."Id" AS Id,
                          G."Title" AS Title,
                          COALESCE(MIN(CASE WHEN T."Completed" THEN 1 ELSE 0 END) = 1, TRUE) AS completed
                      FROM
                          "Group" G
                      LEFT JOIN
                          "ToDo" T ON G."Id" = T."GroupId"
                      GROUP BY
                          G."Id", G."Title";
                  """;

        var groups = await connection.QueryAsync<GroupItemIncComplete>(sql);

        return groups;
    }
    
    public async Task<bool> Add(GroupItem item)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      INSERT INTO "Group"
                      VALUES (@Id, @Title)
                  """;

        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }

    public async Task<bool> Delete(string id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      DELETE FROM "Group"
                      WHERE "Id" = @id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id });
        
        return result == 1;
    }

    public async Task<bool> Update(GroupItem item)
    {
        using var connection = context.CreateConnection();
        
        var sql = """
                      UPDATE "Group"
                      SET "Title" = @Title
                      WHERE "Id" = @Id
                  """;
        
        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }
}