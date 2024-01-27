using Microsoft.AspNetCore.Mvc;
using ToDo.Services.Group;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GroupController(IGroupService groupService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupItemIncComplete>>> GetAll()
        {
            var groups = await groupService.GetAll();
            return Ok(groups);
        }
        
        [HttpPost]
        public async Task<ActionResult> Post(GroupItem item)
        {
            await groupService.Add(item);
            return Ok(new { message = "Group created" });
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await groupService.Delete(id);
            return Ok(new { message = "Group deleted" });
        }
        
        [HttpPut]
        public async Task<ActionResult> Put(GroupItem item)
        {
            await groupService.Update(item);
            return Ok(new { message = "Group updated" });
        }
    }
}
