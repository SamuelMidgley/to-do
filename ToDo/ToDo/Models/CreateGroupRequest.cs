using System.ComponentModel.DataAnnotations;

namespace ToDo.Models;

public class CreateGroupRequest
{
    [Required]
    [MinLength(2)]
    public string Title { get; set; }
}