"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSearch } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TaskFormProps {
  onSubmit: (data: any) => void
  initialData: any
}

const assignees = ["Alice", "Bob", "Charlie"]

export function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const [assignee, setAssignee] = useState("")
  const [assigneeSearch, setAssigneeSearch] = useState("")
  const [taskTitle, setTaskTitle] = useState(initialData.title || "")
  const [taskDescription, setTaskDescription] = useState(initialData.description || "")
  const [dueDate, setDueDate] = useState(new Date())

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit({ title: taskTitle, description: taskDescription, assignee, dueDate })
  }

  const filteredAssignees = assignees.filter((assignee) =>
    assignee.toLowerCase().includes(assigneeSearch.toLowerCase()),
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger id="assignee">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectSearch
              placeholder="Search assignees..."
              value={assigneeSearch}
              onChange={(e) => setAssigneeSearch(e.target.value)}
            />
            {filteredAssignees.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">No assignees found</div>
            ) : (
              filteredAssignees.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:ring-2 focus:ring-ring focus:ring-offset-2",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
