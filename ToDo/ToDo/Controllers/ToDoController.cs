using Microsoft.AspNetCore.Mvc;
using ToDo.Logic.ToDo;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ToDoController(IToDoLogic toDoLogic) : ControllerBase
    {
        [HttpGet("{groupId}")]
        public async Task<ActionResult<Result<IEnumerable<ToDoItem>>>> GetAll(string groupId)
        {
            return await toDoLogic.GetAllToDoItems(groupId);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> Post(ToDoItem item)
        {
            return await toDoLogic.AddToDoItem(item);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> Delete(string id)
        {
            return await toDoLogic.DeleteToDoItem(id);
        }
        
        [HttpPut]
        public async Task<ActionResult<Result>> Put(ToDoItem item)
        {
            return await toDoLogic.UpdateToDoItem(item);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Result>> UpdateToDoState(string id, bool completed)
        {
            return await toDoLogic.UpdateToDoState(id, completed);
        }
        
        [HttpPatch("{id}/title")]
        public async Task<ActionResult<Result>> UpdateToDoTitle(string id, [FromBody] string title)
        {
            return await toDoLogic.UpdateToDoTitle(id, title);
        }
    }
}
