// app/(dashboard)/learn/messages/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
 
export interface Message {
  sender: string
  content: string
  createdAt: string
}

export interface Thread {
  id: string
  subject: string
  messages: Message[]
}


const initialThreads: Thread[] = [
  {
    id: 'thread-1',
    subject: 'Welcome to the Course!',
    messages: [
      {
        sender: 'instructor',
        content: 'Hi there! Welcome to the course. Feel free to ask any questions.',
        createdAt: '2025-05-20T10:00:00Z'
      },
      {
        sender: 'learner',
        content: 'Thanks! Excited to begin.',
        createdAt: '2025-05-20T12:30:00Z'
      }
    ]
  },
  {
    id: 'thread-2',
    subject: 'Issue with Chapter 2 Quiz',
    messages: [
      {
        sender: 'learner',
        content: 'I had an error submitting the quiz. Can you check?',
        createdAt: '2025-05-22T09:00:00Z'
      },
      {
        sender: 'instructor',
        content: 'Thanks for the heads-up! It’s fixed now.',
        createdAt: '2025-05-22T11:45:00Z'
      }
    ]
  }
]

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [showNewForm, setShowNewForm] = useState(false)

  const handleNewThreadSubmit = (data: { subject: string; message: string }) => {
    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      subject: data.subject,
      messages: [
        {
          sender: 'learner',
          content: data.message,
          createdAt: new Date().toISOString()
        }
      ]
    }

    setThreads((prev) => [newThread, ...prev])
    setShowNewForm(false)
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-10 px-4 space-y-8 divide-y divide-y-black">

        <div className="mx-auto max-w-xl text-center">
            <h4 className="text-2xl font-bold mb-1">Messages</h4>
            <p className="text-muted-foreground mb-6">
                Communicate directly with your course instructor. Ask questions, report issues, or follow up on any topic.
            </p>
        </div>

      <div className="pb-6">
        <div className="flex justify-between items-center">
          <h6 className="text-lg font-semibold">Start a New Conversation</h6>
          <Button
            variant="ghost"
            onClick={() => setShowNewForm((prev) => !prev)}
            className="flex items-center gap-1 px-2 text-sm"
          >
            {showNewForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showNewForm ? 'Hide' : 'Compose'}
          </Button>
        </div>

        {showNewForm && (
          <div className="mt-4">
            <NewMessageForm onSubmit={handleNewThreadSubmit} />
          </div>
        )}
      </div>

      <div className="space-y-6 divide-y ">
        {threads.map((thread) => (
          <div key={thread.id} className="py-6 first:pt-0">
            <MessageThread thread={thread} />
          </div>
        ))}
      </div>
    </div>
  )
}


interface MessageThreadProps {
  thread: Thread
}

export function MessageThread({ thread }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(thread.messages)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return

    setSending(true)

    const newMessage: Message = {
      sender: 'learner',
      content: reply.trim(),
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setReply('')
    setSending(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-md font-semibold text-foreground">{thread.subject}</h3>
        <p className="text-sm text-muted-foreground">Conversation with instructor</p>
      </div>

      <div className="space-y-3 divide-y">
        {messages.map((message, idx) => (
          <MessageItem
            key={idx}
            sender={message.sender}
            content={message.content}
            createdAt={message.createdAt}
          />
        ))}
      </div>

      <form onSubmit={handleReplySubmit} className="space-y-2 pt-4">
        <Textarea
          placeholder="Type your message..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={3}
          disabled={sending}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={sending || !reply.trim()}>
            {sending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  )
}


interface MessageThreadProps {
  thread: Thread
}


 import { cn } from '@/lib/utils'

interface MessageItemProps {
  sender: string
  content: string
  createdAt: string
}

export function MessageItem({ sender, content, createdAt }: MessageItemProps) {
  const isLearner = sender === 'learner'

  return (
    <div className={cn('flex flex-col max-w-[80%] my-2', isLearner ? 'ml-auto items-end' : 'items-start')}>
      <div
        className={cn(
          'px-4 py-2 rounded-lg text-sm bg-muted',
          isLearner ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
        )}
      >
        {content}
      </div>
      <span className="text-xs text-muted-foreground mt-1">
        {new Date(createdAt).toLocaleString()}
      </span>
    </div>
  )
}



import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'

interface NewMessageFormProps {
  onSubmit: (data: { subject: string; message: string }) => void
}

export function NewMessageForm({ onSubmit }: NewMessageFormProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill out both subject and message.')
      return
    }

    setLoading(true)
    onSubmit({ subject, message })
    setLoading(false)
    setSubject('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-muted/20">
      <div>
        <label className="text-sm font-medium block mb-1">Subject</label>
        <Input
          placeholder="E.g. Having issues with Module 2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-sm font-medium block mb-1">Message</label>
        <Textarea
          placeholder="Describe your issue or send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          disabled={loading}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}
