import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "react-toastify"
import { Megaphone, SendHorizonal, StickyNote } from "lucide-react"

export default function CourseAnnouncement() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to the Course!",
      content:
        "We're excited to have you here. Get ready for an amazing journey through this course. If you have any questions, feel free to reach out!",
      createdAt: new Date().toLocaleDateString(),
      isInitial: true,
    },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error("Please provide both a title and content.")
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setAnnouncements((prev) => [
        {
          id: prev.length + 1,
          ...newAnnouncement,
          createdAt: new Date().toLocaleDateString(),
          isInitial: false,
        },
        ...prev,
      ])
      setNewAnnouncement({ title: "", content: "" })
      setIsSubmitting(false)
      toast.success("Announcement created and sent to learners!")
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-14 p-4 ">
         {/* Page Title and Description */}
          <div className=" mx-auto text-center max-w-xl flex flex-col items-center w-full space-y-2">
            <h4 className="text-3xl font-bold flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-primary" />
              Course Announcements
            </h4>
            <p className="text-muted-foreground max-w-2xl">
              Keep your learners informed and engaged throughout the course. Start with a warm welcome message when they enroll, and share updates, tips, or important changes as they progress. Announcements are visible on the learner dashboard and can also be sent via email.
            </p>
          </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center text-xl">
            <Megaphone className="h-5 w-5 text-primary " /> Add New Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              placeholder="e.g. Update on Module 2"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              placeholder="Write your announcement to learners here..."
              rows={5}
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
            />
          </div>
          {/* add select type, welcom message or updates or use set as welcome message in the list */}
          <Button
            onClick={handleCreateAnnouncement}
            disabled={isSubmitting}
            className="gap-2"
          >
            <SendHorizonal className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Publish Announcement"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <StickyNote className="h-5 w-5 text-muted-foreground" /> Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 pr-4">
            <div className="space-y-6">
              {announcements.map((a) => (
                <div key={a.id} className="border p-4 rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-base">
                      {a.isInitial ? "📩 Initial Welcome" : a.title}
                    </h4>
                    <span className="text-sm text-muted-foreground">{a.createdAt}</span>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {a.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
