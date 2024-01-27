using System.ComponentModel.DataAnnotations;

namespace ToDo.Models;

public class ToDoItem
{
    [StringLength(25)]
    public string Id { get; set; } = "";
    
    [StringLength(200)]
    public string Title { get; set; } = "";
    
    public bool Completed { get; set; } = false;

    public string GroupId { get; set; } = "";
}