using ToDo.Models;
using ToDo.Repository.Group;

namespace ToDo.Logic.Group;

public class GroupLogic(IGroupRepository groupRepository): IGroupLogic
{
    public async Task<Result<IEnumerable<GroupItemIncComplete>>> GetAll()
    {
        var groups = await groupRepository.GetAll();

        return Result<IEnumerable<GroupItemIncComplete>>.Success(groups);
    }

    public async Task<Result> Add(GroupItem item)
    {
        var result = await groupRepository.Add(item);
        
        return result ? Result.Success() : Result.Failure("Failed to add group");
    } 
        
    public async Task<Result> Update(GroupItem item)
    {
        var result = await groupRepository.Update(item);
        
        return result ? Result.Success() : Result.Failure("Failed to update group");
    }

    public async Task<Result> Delete(string id)
    {
        var result = await groupRepository.Delete(id);
        
        return result ? Result.Success() : Result.Failure("Failed to delete group");
    }
}