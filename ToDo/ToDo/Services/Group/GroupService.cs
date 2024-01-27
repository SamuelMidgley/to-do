using ToDo.Models;
using ToDo.Repository.Group;

namespace ToDo.Services.Group;

public class GroupService(IGroupRepository groupRepository): IGroupService
{
    public async Task<IEnumerable<GroupItemIncComplete>> GetAll()
    {
        return await groupRepository.GetAll();
    }

    public async Task Add(GroupItem item)
    {
        await groupRepository.Add(item);
    } 
        
    public async Task Update(GroupItem item)
    {
        var group = groupRepository.GetById(item.Id);
        if (group == null)
            throw new KeyNotFoundException("Group not found");
        
        await groupRepository.Update(item);
    }

    public async Task Delete(string id)
    {
        await groupRepository.Delete(id);
    }
}