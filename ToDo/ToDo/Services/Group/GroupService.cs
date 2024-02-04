using ToDo.Helpers;
using ToDo.Models;
using ToDo.Repositories.Group;

namespace ToDo.Services.Group;

public class GroupService(IGroupRepository groupRepository): IGroupService
{
    public async Task<GroupItem> GetById(int id)
    {
        var group = await groupRepository.GetById(id);
        if (group == null)
            throw new KeyNotFoundException("Group not found");
        
        return group;
    }
    
    public async Task<IEnumerable<GroupItemIncComplete>> GetAll()
    {
        return await groupRepository.GetAll();
    }

    public async Task Add(CreateGroupRequest item)
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

    public async Task Delete(int id)
    {
        await groupRepository.Delete(id);
    }
}