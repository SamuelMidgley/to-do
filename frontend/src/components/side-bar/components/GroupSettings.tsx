import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GearIcon } from '@radix-ui/react-icons'

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { IGroup } from '@/types'
import groupService from '@/services/groupService'

interface IGroupSettings {
  group: IGroup
}

export function GroupSettings({ group }: IGroupSettings) {
  const { id, title } = group
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState(title)

  const mutation = useMutation({
    mutationFn: (groupId: number) => groupService.deleteGroup(groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  const updateName = useMutation({
    mutationFn: (group: IGroup) => groupService.updateGroup(group),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })

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
                  updateName.mutate({
                    id,
                    title: groupName,
                  })
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
                window.alert('Oops not implemented yet')
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
                    mutation.mutate(id)
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
