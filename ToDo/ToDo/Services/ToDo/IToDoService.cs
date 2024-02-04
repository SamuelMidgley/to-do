using ToDo.Models;

namespace ToDo.Services.ToDo;

public interface IToDoService
{
    Task<IEnumerable<ToDoItem>> GetMyDayToDoItems();
    
    Task<IEnumerable<ToDoItem>> GetAllToDoItems(int groupId);

    Task AddToDoItem(CreateToDoRequest item);

    Task DeleteToDoItem(int id);
    
    Task UpdateToDoState(int id, bool completed);

    Task UpdateToDoTitle(int id, string title);
    
    Task DeleteToDosFromGroup(int groupId, bool completed);
}