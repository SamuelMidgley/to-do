using ToDo.Models;

namespace ToDo.Services.Group;

public interface IGroupService
{
    Task<IEnumerable<GroupItemIncComplete>> GetAll();

    Task Add(GroupItem item);

    Task Delete(string id);

    Task Update(GroupItem item);
}