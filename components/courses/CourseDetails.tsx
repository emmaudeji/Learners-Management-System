import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Course } from '@/types';
import Link from 'next/link';
import EnrolNowBtn from './EnrolNowBtn';

const CourseDetails = ({course}:{course:Course}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left (Main) */}
      <div className="lg:col-span-2 space-y-10">
        {/* Course Header */}
        <section className="space-y-4">
          <Badge className="bg-indigo-100 text-indigo-800">Course</Badge>
          <h1 className="text-3xl font-bold leading-tight">
            {course.title || "Advanced AI Agent Systems with LangChain and LangGraph"}
          </h1>
          <p className="text-muted-foreground text-lg">
            This course explores the use of LangChain and LangGraph for building advanced AI agent systems.
            It introduces learners to graph theory, state machines, and agentic systems, enabling them to build
            flexible AI-driven solutions for tasks such as knowledge retrieval using cyclical workflows.
          </p>
        </section>

        {/* Course Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Intermediate</span>
          <Separator orientation="vertical" className="h-4" />
          <span>13 hours</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Last Updated April 25, 2025</span>
        </div>

        {/* Skills You'll Learn */}
        <section>
          <h2 className="font-semibold text-lg mb-2">Skills you'll learn</h2>
          <div className="flex flex-wrap gap-2">
            {["Retrieval-Augmented Generation", "AI agents", "LangGraph", "LangChain"].map(skill => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section>
          <h2 className="font-semibold text-lg mb-2">Prerequisites</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            {["REST APIs", "OpenAI API", "Advanced Python", "Large Language Models"].map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        {/* Curriculum */}
        <section>
          <h2 className="font-semibold text-xl mb-4">Course Lessons</h2>
          {/* <Accordion type="single" collapsible className="w-full">
            {["Introduction to Agentic Frameworks", "Build with LLMs in LangChain", "Agentic Workflows with LangGraph", "Create a Knowledge Base Agent", "HealthBot: AI-Powered Patient Education System"].map((lesson, idx) => (
              <AccordionItem key={lesson} value={`item-${idx}`}>
                <AccordionTrigger>Lesson {idx + 1}: {lesson}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
               
                    This lesson covers detailed concepts of {lesson.toLowerCase()}.
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
        </section>

        {/* Instructor */}
        <section className="flex items-start gap-6">
          <img
            src="https://via.placeholder.com/120"
            alt="Instructor"
            className="rounded-full w-28 h-28 object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">Henrique Santana</h3>
            <p className="text-muted-foreground text-sm">
              Principal Machine Learning Engineer at Dell Technologies. Henrique specializes in AI implementation
              for digital businesses. He teaches AI for business leaders and explores Generative AI and LLM frameworks.
            </p>
          </div>
        </section>

        {/* What Makes This Course Different */}
        <section className="space-y-4">
          <h2 className="font-semibold text-xl">The Udacity Difference</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Real-world projects with expert feedback</li>
            <li>Personalized career coaching and mentorship</li>
            <li>Proven upskilling system to retain knowledge</li>
            <li>Learn industry best practices and gain insights</li>
          </ul>
        </section>
      </div>

      {/* Sidebar */}
      <aside className=" ">
      <section className="space-y-6 sticky top-24">
        <div className="p-6 border rounded-xl bg-white dark:bg-muted space-y-4">
          <h3 className="text-lg font-semibold">Pricing</h3>
          <div>
            <div className="text-2xl font-bold">$125 / month</div>
            <div className="text-sm text-muted-foreground">Cancel Anytime</div>
          </div>
          <EnrolNowBtn course={course}/>

          <div className="text-xs text-muted-foreground">
            50% off for bundle plans. Ends soon. Save now.
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-muted">
          <h4 className="font-semibold mb-2">What’s included:</h4>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Unlimited access to top-rated courses</li>
            <li>Hands-on projects</li>
            <li>Career coaching</li>
            <li>Program certificate</li>
          </ul>
        </div>
      </section>
      </aside>
    </div>
  );
};

export default CourseDetails;