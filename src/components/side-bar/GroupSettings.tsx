import { useState } from 'react'
import { GearIcon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IGroup } from '@/types'
import { useGroupStore } from '@/stores/group'

interface IGroupSettings {
  group: IGroup
}

export function GroupSettings({ group }: IGroupSettings) {
  const { id, title } = group
  const [groupName, setGroupName] = useState(title)
  const updateGroup = useGroupStore((state) => state.updateGroup)
  const deleteGroup = useGroupStore((state) => state.deleteGroup)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <GearIcon />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <span className="font-semibold pt-2">Group name</span>
        <div className="flex justify-between gap-2 mb-2">
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button onClick={() => updateGroup(id, groupName)}>Rename</Button>
        </div>
        <span className="font-semibold">Danger Zone</span>
        <div className="flex items-center justify-between border-2 rounded-md p-3 border-destructive">
          <div>
            <h2 className="font-semibold">Delete group</h2>
            <span className="text-sm">
              Warning: This action is irreversible
            </span>
          </div>
          <Button variant="destructive" onClick={() => deleteGroup(id)}>
            Delete group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
