
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Star, Users, BookOpen } from "lucide-react";

const dummyInstructor = {
  name: "Jane Doe",
  title: "Senior UI/UX Instructor",
  bio: `I’m passionate about design systems, accessibility, and helping others build beautiful, usable products. I’ve trained over 20,000 students globally.`,
  image: "/images/instructor1.jpg",
  students: 20000,
  rating: 4.8,
  courses: 12,
  socials: {
    twitter: "https://twitter.com/instructorjane",
    linkedin: "https://linkedin.com/in/janedoe",
  },
};

const InstructorProfilePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <Image
          src={dummyInstructor.image}
          alt={dummyInstructor.name}
          width={160}
          height={160}
          className="rounded-full object-cover border shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{dummyInstructor.name}</h1>
          <p className="text-muted-foreground">{dummyInstructor.title}</p>
          <p className="mt-4 max-w-2xl">{dummyInstructor.bio}</p>

          <div className="flex flex-wrap gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {dummyInstructor.students.toLocaleString()} students
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" /> {dummyInstructor.rating} average rating
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> {dummyInstructor.courses} courses
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <a href={dummyInstructor.socials.twitter} target="_blank" rel="noopener">
              <Button variant="outline" size="sm">Twitter</Button>
            </a>
            <a href={dummyInstructor.socials.linkedin} target="_blank" rel="noopener">
              <Button variant="outline" size="sm">LinkedIn</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">About Jane</h3>
              <p>
                Jane Doe is a UI/UX expert with over 10 years of experience in product design and teaching. 
                She has contributed to open-source projects, led design teams, and taught thousands of students globally.
              </p>
              <p>
                Her focus is on empowering students with practical design and frontend skills that are relevant in today’s job market.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 space-y-2">
                  <Image
                    src="/images/course-thumb.jpg"
                    alt="Course thumbnail"
                    width={400}
                    height={200}
                    className="rounded-md object-cover"
                  />
                  <h4 className="text-md font-semibold">UI Design for Beginners</h4>
                  <p className="text-sm text-muted-foreground">4.7 ⭐ • 5,000 students</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">What students say</h3>
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <p className="font-medium">“Jane is an excellent teacher. Her explanations are clear and concise.”</p>
                  <p className="text-sm text-muted-foreground">— Sarah K.</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium">“I landed my first UI job after taking her course!”</p>
                  <p className="text-sm text-muted-foreground">— James O.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorProfilePage;
