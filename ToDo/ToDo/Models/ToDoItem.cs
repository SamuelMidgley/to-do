using System.ComponentModel.DataAnnotations;

namespace ToDo.Models;

public class ToDoItem
{
    public int Id { get; set; }
    
    [StringLength(200)]
    public string Title { get; set; } = "";
    
    public bool Completed { get; set; }

    public int GroupId { get; set; }
    
    public bool MyDay { get; set; }
    
    public DateTime DateCreated { get; set; }
}