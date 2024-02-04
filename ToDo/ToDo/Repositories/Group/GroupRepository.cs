using Dapper;
using ToDo.Helpers;
using ToDo.Models;

namespace ToDo.Repositories.Group;

public class GroupRepository(DataContext context) : IGroupRepository
{
    public async Task<GroupItem> GetById(int id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                    SELECT *
                    FROM "group"
                    WHERE "id" = @Id
                    AND "is_deleted" = false
                  """;

        return await connection.QueryFirstAsync<GroupItem>(sql, new { id });
    }
    
    public async Task<IEnumerable<GroupItemIncComplete>> GetAll()
    {
        using var connection = context.CreateConnection();

        var sql = """
                      SELECT
                          G."id" AS Id,
                          G."title" AS Title,
                          COALESCE(MIN(CASE WHEN T."completed" THEN 1 ELSE 0 END) = 1, TRUE) AS completed
                      FROM
                          "group" G
                      LEFT JOIN
                          "to_do" T ON G."id" = T."group_id"
                      WHERE G.is_deleted = false
                        OR T.is_deleted = false
                      GROUP BY
                          G."id", G."title"
                      ORDER BY G."id";
                  """;

        var groups = await connection.QueryAsync<GroupItemIncComplete>(sql);

        return groups;
    }
    
    public async Task<bool> Add(CreateGroupRequest item)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      INSERT INTO "group"("title")
                      VALUES (@Title)
                  """;

        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }

    public async Task<bool> Delete(int id)
    {
        using var connection = context.CreateConnection();

        var sql = """
                      UPDATE "group"
                      SET "is_deleted" = true
                      WHERE "id" = @id
                  """;

        var result = await connection.ExecuteAsync(sql, new { id });
        
        return result == 1;
    }

    public async Task<bool> Update(GroupItem item)
    {
        using var connection = context.CreateConnection();
        
        var sql = """
                      UPDATE "group"
                      SET "title" = @Title
                      WHERE "id" = @Id
                  """;
        
        var result = await connection.ExecuteAsync(sql, item);
        
        return result == 1;
    }
}