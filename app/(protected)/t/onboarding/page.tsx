"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function InstructorEnrollPage() {
 
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return alert("Please accept terms to proceed.");
    // TODO: Submit to Supabase or API
    router.push("/t/my-courses");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Become an Instructor</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="p-6 grid gap-6 lg:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Tell us about your teaching background, interests, and style..."
                required
              />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="expertise">Topics You Teach</Label>
              <Input
                id="expertise"
                name="expertise"
                placeholder="e.g., Web Development, UI/UX, Python, Marketing"
                required
              />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="experience">Experience & Qualifications</Label>
              <Textarea
                id="experience"
                name="experience"
                rows={4}
                placeholder="Mention certifications, past teaching roles, platforms you've used..."
                required
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/you" />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube Channel (Optional)</Label>
              <Input id="youtube" name="youtube" type="url" placeholder="https://youtube.com/@you" />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="portfolio">Upload CV / Portfolio</Label>
              <Input id="portfolio" name="portfolio" type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="flex items-center space-x-2 lg:col-span-2">
              <Checkbox id="terms" checked={agree} onCheckedChange={() => setAgree(!agree)} />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <a href="/terms" className="underline">terms and conditions</a>
              </label>
            </div>
          </CardContent>
        </Card>
        <div className="text-center">
          <Button type="submit" className="px-6">Submit Application</Button>
        </div>
      </form>
    </div>
  );
}
