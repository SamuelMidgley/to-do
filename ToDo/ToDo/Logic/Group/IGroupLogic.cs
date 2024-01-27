using ToDo.Models;

namespace ToDo.Logic.Group;

public interface IGroupLogic
{
    Task<Result<IEnumerable<GroupItemIncComplete>>> GetAll();

    Task<Result> Add(GroupItem item);

    Task<Result> Delete(string id);

    Task<Result> Update(GroupItem item);
}