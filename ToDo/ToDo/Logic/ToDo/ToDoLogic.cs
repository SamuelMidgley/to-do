using ToDo.Models;
using ToDo.Repository.ToDo;

namespace ToDo.Logic.ToDo;

public class ToDoLogic(IToDoRepository toDoRepository) : IToDoLogic
{
    public async Task<Result<IEnumerable<ToDoItem>>> GetAllToDoItems(string groupId)
    {
        var toDoList = await toDoRepository.GetAllToDoItems(groupId);

        return Result<IEnumerable<ToDoItem>>.Success(toDoList);
    }

    public async Task<Result> AddToDoItem(ToDoItem item)
    {
        var success = await toDoRepository.AddToDoItem(item);

        return success ? Result.Success() : Result.Failure("Failed to add to do");
    }

    public async Task<Result> DeleteToDoItem(string id)
    {
        var success = await toDoRepository.DeleteToDoItem(id);

        return success ? Result.Success() : Result.Failure("Failed to delete to do with id: ");
    }

    public async Task<Result> UpdateToDoItem(ToDoItem item)
    {
        var success = await toDoRepository.UpdateToDoItem(item);

        return success ? Result.Success() : Result.Failure("Failed to update to do with id: ");
    }

    public async Task<Result> UpdateToDoState(string id, bool completed)
    {
        var success = await toDoRepository.UpdateToDoState(id, completed);

        return success ? Result.Success() : Result.Failure("Failed to update to do with id: ");
    }
    
    public async Task<Result> UpdateToDoTitle(string id, string title)
    {
        var success = await toDoRepository.UpdateToDoTitle(id, title);

        return success ? Result.Success() : Result.Failure("Failed to update to do with id: ");
    }
}