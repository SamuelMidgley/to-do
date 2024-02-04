using System.ComponentModel.DataAnnotations;

namespace ToDo.Models;

public class CreateToDoRequest
{
    [StringLength(200)] public string Title { get; set; } = "";
    
    public bool MyDay { get; set; }
    
    public int? GroupId { get; set; }
}