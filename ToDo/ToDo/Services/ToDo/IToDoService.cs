using ToDo.Models;

namespace ToDo.Services.ToDo;

public interface IToDoService
{
    Task<IEnumerable<ToDoItem>> GetAllToDoItems(string groupId);

    Task AddToDoItem(ToDoItem item);

    Task DeleteToDoItem(string id);
    
    Task UpdateToDoState(string id, bool completed);

    Task UpdateToDoTitle(string id, string title);
}