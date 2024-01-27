using Microsoft.AspNetCore.Mvc;
using ToDo.Logic.Group;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GroupController(IGroupLogic groupLogic) : ControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<Result<IEnumerable<GroupItemIncComplete>>>> GetAll()
        {
            return await groupLogic.GetAll();
        }
        
        [HttpPost("")]
        public async Task<ActionResult<Result>> Post(GroupItem item)
        {
            return await groupLogic.Add(item);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> Delete(string id)
        {
            return await groupLogic.Delete(id);
        }
        
        [HttpPut]
        public async Task<ActionResult<Result>> Put(GroupItem item)
        {
            return await groupLogic.Update(item);
        }
    }
}
