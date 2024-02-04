using ToDo.Models;
using ToDo.Repositories.ToDo;

namespace ToDo.Services.ToDo;

public class ToDoService(IToDoRepository toDoRepository) : IToDoService
{
    public async Task<IEnumerable<ToDoItem>> GetMyDayToDoItems()
    {
        return await toDoRepository.GetMyDayToDoItems();
    }
    
    public async Task<IEnumerable<ToDoItem>> GetAllToDoItems(int groupId)
    {
        return await toDoRepository.GetAllToDoItems(groupId);
    }

    public async Task AddToDoItem(CreateToDoRequest item)
    {
        // Check group exists
        
        await toDoRepository.AddToDoItem(item);
    }

    public async Task DeleteToDoItem(int id)
    {
        await toDoRepository.DeleteToDoItem(id);
    }

    public async Task UpdateToDoState(int id, bool completed)
    {
        var toDo = toDoRepository.GetToDoById(id);
        if (toDo == null)
            throw new KeyNotFoundException("To do not found");
        
        await toDoRepository.UpdateToDoState(id, completed);
    }
    
    public async Task UpdateToDoTitle(int id, string title)
    {
        var toDo = toDoRepository.GetToDoById(id);
        if (toDo == null)
            throw new KeyNotFoundException("To do not found");
        
        await toDoRepository.UpdateToDoTitle(id, title);
    }

    public async Task DeleteToDosFromGroup(int groupId, bool completed)
    {
        await toDoRepository.DeleteToDosFromGroup(groupId, completed);
    }
}