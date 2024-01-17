import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useGroupStore } from '@/stores/group'

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

interface INewGroup {
  closePanel: () => void
}

export function NewGroup({ closePanel }: INewGroup) {
  const [open, setOpen] = useState(false)
  const addGroup = useGroupStore((state) => state.addGroup)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addGroup(values.name)
    setOpen(false)
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
