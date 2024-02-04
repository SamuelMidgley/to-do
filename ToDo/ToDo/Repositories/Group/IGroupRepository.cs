using ToDo.Models;

namespace ToDo.Repositories.Group;

public interface IGroupRepository
{
    Task<GroupItem> GetById(int id);
    
    Task<IEnumerable<GroupItemIncComplete>> GetAll();

    Task<bool> Add(CreateGroupRequest item);

    Task<bool> Delete(int id);

    Task<bool> Update(GroupItem item);
}