using System.Collections;
using Microsoft.AspNetCore.Mvc;
using ToDo.Services.ToDo;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ToDoController(IToDoService toDoService) : ControllerBase
    {
        [HttpGet("{groupId:int}")]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAll(int groupId)
        {
            var toDos = await toDoService.GetAllToDoItems(groupId);
            return Ok(toDos);
        }

        [HttpGet("myday")]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetMyDayToDos()
        {
            var toDos = await toDoService.GetMyDayToDoItems();
            return Ok(toDos);
        }

        [HttpPost]
        public async Task<ActionResult> Post(CreateToDoRequest item)
        {
            await toDoService.AddToDoItem(item);
            return Ok(new { message = "To do created" });
        }
        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            await toDoService.DeleteToDoItem(id);
            return Ok(new { message = "To do deleted" });
        }

        [HttpPatch("{id:int}")]
        public async Task<ActionResult> UpdateToDoState(int id, bool completed)
        {
            await toDoService.UpdateToDoState(id, completed);
            return Ok(new { message = "To do state updated" });
        }
        
        [HttpPatch("{id:int}/title")]
        public async Task<ActionResult> UpdateToDoTitle(int id, [FromBody] string title)
        {
            await toDoService.UpdateToDoTitle(id, title);
            return Ok(new { message = "To do title updated" });
        }

        [HttpDelete("group/{groupId:int}")]
        public async Task<ActionResult> DeleteToDosFromGroup(int groupId, bool completed)
        {
            await toDoService.DeleteToDosFromGroup(groupId, completed);
            return Ok(new { message = "To dos deleted from group" });
        }
    }
}
