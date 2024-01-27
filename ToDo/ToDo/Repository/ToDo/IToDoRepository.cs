using ToDo.Models;

namespace ToDo.Repository.ToDo;

public interface IToDoRepository
{
    Task<IEnumerable<ToDoItem>> GetAllToDoItems(string groupId);

    Task<bool> AddToDoItem(ToDoItem item);

    Task<bool> DeleteToDoItem(string id);

    Task<bool> UpdateToDoItem(ToDoItem item);

    Task<bool> UpdateToDoState(string id, bool completed);

    Task<bool> UpdateToDoTitle(string id, string title);
}