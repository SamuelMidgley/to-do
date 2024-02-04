import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from '@radix-ui/react-icons'

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import groupService from '@/services/groupService'
import { CreateGroupRequest } from '@/types'

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

interface INewGroup {
  closePanel: () => void
}

export function NewGroup({ closePanel }: INewGroup) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const mutation = useMutation({
    mutationFn: (newGroup: CreateGroupRequest) =>
      groupService.postGroup(newGroup),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false)
    mutation.mutate({
      title: values.name,
    })
    closePanel()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex gap-2 items-center flex-1"
        >
          <PlusIcon />
          New group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add group</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
