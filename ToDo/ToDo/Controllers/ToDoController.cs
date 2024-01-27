using Microsoft.AspNetCore.Mvc;
using ToDo.Services.ToDo;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ToDoController(IToDoService toDoService) : ControllerBase
    {
        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAll(string groupId)
        {
            var toDos = await toDoService.GetAllToDoItems(groupId);
            return Ok(toDos);
        }

        [HttpPost]
        public async Task<ActionResult> Post(ToDoItem item)
        {
            await toDoService.AddToDoItem(item);
            return Ok(new { message = "To do created" });
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await toDoService.DeleteToDoItem(id);
            return Ok(new { message = "To do deleted" });
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateToDoState(string id, bool completed)
        {
            await toDoService.UpdateToDoState(id, completed);
            return Ok(new { message = "To do state updated" });
        }
        
        [HttpPatch("{id}/title")]
        public async Task<ActionResult> UpdateToDoTitle(string id, [FromBody] string title)
        {
            await toDoService.UpdateToDoTitle(id, title);
            return Ok(new { message = "To do title updated" });
        }
    }
}
