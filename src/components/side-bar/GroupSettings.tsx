import { useState } from 'react'
import { GearIcon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { IGroup } from '@/types'
import { useGroupStore } from '@/stores/group'
import { useToDoStore } from '@/stores/todo'

interface IGroupSettings {
  group: IGroup
}

export function GroupSettings({ group }: IGroupSettings) {
  const { id, title } = group
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState(title)
  const updateGroup = useGroupStore((state) => state.updateGroup)
  const deleteGroup = useGroupStore((state) => state.deleteGroup)
  const deleteToDosFromGroup = useToDoStore(
    (state) => state.deleteToDosFromGroup
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <GearIcon />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-lg font-semibold">{title} settings</h1>
        {id !== 'My day' && (
          <>
            <span className="font-semibold pt-2">Group name</span>
            <div className="flex justify-between gap-2 mb-2">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                onClick={() => {
                  setOpen(false)
                  updateGroup(id, groupName)
                }}
              >
                Rename
              </Button>
            </div>
          </>
        )}

        <span className="font-semibold">Danger Zone</span>
        <div className="border-2 rounded-md p-3 border-destructive">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Delete to dos</h2>
              <span className="text-sm">
                Warning: This action is irreversible
              </span>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false)
                deleteToDosFromGroup(id)
              }}
            >
              Delete to dos
            </Button>
          </div>
          {id !== 'My day' && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Delete group</h2>
                  <span className="text-sm">
                    Warning: This action is irreversible
                  </span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpen(false)
                    deleteGroup(id)
                  }}
                >
                  Delete group
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
