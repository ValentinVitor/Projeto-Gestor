"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function Tarefas() {
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])
  const [newTaskText, setNewTaskText] = useState("")
  const [newNoteText, setNewNoteText] = useState("")

  useEffect(() => {
    fetchTasks()
    fetchNotes()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lertask')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lernote')
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const handleTaskComplete = async (id) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    // You might also want to update this on the server side
  }

  const handleTaskEdit = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const handleTaskDelete = async (text) => {
    try {
      await fetch('http://localhost:3000/api/deletartask', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })
      setTasks((prevTasks) => prevTasks.filter((task) => task.text !== text))
      fetchNotes() // Certifique-se de que estamos recarregando as notas após a deleção de uma tarefa
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }
  

  const handleAddTask = async () => {
    if (newTaskText.trim() !== "") {
      try {
        const response = await fetch('http://localhost:3000/api/inserirtask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: newTaskText,
            completed: false
          })
        })
        const result = await response.json()
        setTasks((prevTasks) => [...prevTasks, { id: result.insertId, text: newTaskText, completed: false }])
        setNewTaskText("")
      } catch (error) {
        console.error("Error adding task:", error)
      }
    }
  }

  const handleAddNote = async () => {
    if (newNoteText.trim() !== "") {
      try {
        const response = await fetch('http://localhost:3000/api/inserirnote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: newNoteText })
        })
        const result = await response.json()
        setNotes((prevNotes) => [...prevNotes, { id: result.insertId, text: newNoteText }])
        setNewNoteText("")
      } catch (error) {
        console.error("Error adding note:", error)
      }
    }
  }

  const handleNoteDelete = async (text) => {
    try {
      await fetch('http://localhost:3000/api/deletarnote', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })
      setNotes((prevNotes) => prevNotes.filter((note) => note.text !== text))
      fetchTasks() // Certifique-se de que estamos recarregando as tarefas após a deleção de uma nota
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }
  

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Tarefas e Anotações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Tarefas</h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 rounded-md bg-muted p-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskComplete(task.id)}
                />
                <Input
                  id={`task-${task.id}`}
                  value={task.text}
                  onChange={(e) => handleTaskEdit(task.id, e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => handleTaskDelete(task.text)}>
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Deletar Tarefa</span>
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Adicione uma tarefa"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask()
                  }
                }}
              />
              <Button onClick={handleAddTask}>Adicionar</Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Anotações</h3>
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                <Textarea
                  id={`note-${note.id}`}
                  value={note.text}
                  onChange={(e) =>
                    setNotes((prevNotes) =>
                      prevNotes.map((n) => (n.id === note.id ? { ...n, text: e.target.value } : n)),
                    )
                  }
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => handleNoteDelete(note.text)}>
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Deletar Nota</span>
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Textarea
                placeholder="Adicione uma anotação"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddNote()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleAddNote}>Adicionar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
