using ToDo.Models;

namespace ToDo.Repositories.ToDo;

public interface IToDoRepository
{
    Task<ToDoItem> GetToDoById(int id);

    Task<IEnumerable<ToDoItem>> GetMyDayToDoItems();
    
    Task<IEnumerable<ToDoItem>> GetAllToDoItems(int groupId);

    Task<bool> AddToDoItem(CreateToDoRequest item);

    Task<bool> DeleteToDoItem(int id);

    Task<bool> DeleteToDosFromGroup(int groupId, bool completed);
    
    Task<bool> UpdateToDoState(int id, bool completed);

    Task<bool> UpdateToDoTitle(int id, string title);
}