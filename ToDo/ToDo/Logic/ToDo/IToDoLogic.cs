using ToDo.Models;

namespace ToDo.Logic.ToDo;

public interface IToDoLogic
{
    Task<Result<IEnumerable<ToDoItem>>> GetAllToDoItems(string groupId);

    Task<Result> AddToDoItem(ToDoItem item);

    Task<Result> DeleteToDoItem(string id);

    Task<Result> UpdateToDoItem(ToDoItem item);

    Task<Result> UpdateToDoState(string id, bool completed);

    Task<Result> UpdateToDoTitle(string id, string title);
}