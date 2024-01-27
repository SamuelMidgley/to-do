using System.Configuration;
using System.Data;
using Npgsql;

namespace ToDo.Helpers;

public class DataContext(IConfiguration configuration)
{
    public IDbConnection CreateConnection()
    {
        var connectionString = configuration.GetConnectionString("WebApiDatabase");

        return new NpgsqlConnection(connectionString);
    }
}