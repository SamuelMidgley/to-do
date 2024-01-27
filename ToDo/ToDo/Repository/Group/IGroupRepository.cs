using ToDo.Models;

namespace ToDo.Repository.Group;

public interface IGroupRepository
{
    Task<IEnumerable<GroupItemIncComplete>> GetAll();

    Task<bool> Add(GroupItem item);

    Task<bool> Delete(string id);

    Task<bool> Update(GroupItem item);
}