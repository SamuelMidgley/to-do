using ToDo.Models;

namespace ToDo.Services.Group;

public interface IGroupService
{
    Task<GroupItem> GetById(int id);
    
    Task<IEnumerable<GroupItemIncComplete>> GetAll();

    Task Add(CreateGroupRequest item);

    Task Delete(int id);

    Task Update(GroupItem item);
}