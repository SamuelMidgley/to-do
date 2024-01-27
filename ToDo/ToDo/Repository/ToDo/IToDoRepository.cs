﻿using ToDo.Models;

namespace ToDo.Repository.ToDo;

public interface IToDoRepository
{
    Task<ToDoItem> GetToDoById(string id);
    
    Task<IEnumerable<ToDoItem>> GetAllToDoItems(string groupId);

    Task<bool> AddToDoItem(ToDoItem item);

    Task<bool> DeleteToDoItem(string id);
    
    Task<bool> UpdateToDoState(string id, bool completed);

    Task<bool> UpdateToDoTitle(string id, string title);
}