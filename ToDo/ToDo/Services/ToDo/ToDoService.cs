using ToDo.Models;
using ToDo.Repository.ToDo;

namespace ToDo.Services.ToDo;

public class ToDoService(IToDoRepository toDoRepository) : IToDoService
{
    public async Task<IEnumerable<ToDoItem>> GetAllToDoItems(string groupId)
    {
        return await toDoRepository.GetAllToDoItems(groupId);
    }

    public async Task AddToDoItem(ToDoItem item)
    {
        // Check group exists
        
        await toDoRepository.AddToDoItem(item);
    }

    public async Task DeleteToDoItem(string id)
    {
        await toDoRepository.DeleteToDoItem(id);
    }

    public async Task UpdateToDoState(string id, bool completed)
    {
        var toDo = toDoRepository.GetToDoById(id);
        if (toDo == null)
            throw new KeyNotFoundException("To do not found");
        
        await toDoRepository.UpdateToDoState(id, completed);
    }
    
    public async Task UpdateToDoTitle(string id, string title)
    {
        var toDo = toDoRepository.GetToDoById(id);
        if (toDo == null)
            throw new KeyNotFoundException("To do not found");
        
        await toDoRepository.UpdateToDoTitle(id, title);
    }
}