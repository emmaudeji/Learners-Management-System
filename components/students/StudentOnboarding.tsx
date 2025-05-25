'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { CustomInput } from "../shared/CustomInput";
import { Badge } from "../ui/badge";
import CenterModal from "../shared/CenterModal";

const goals = ['Get a tech job', 'Build a project', 'Learn for fun', 'Switch careers'];
const topics = ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Data Science', 'DevOps'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const StudentOnboarding = ({setOpen}:{
    setOpen:Dispatch<SetStateAction<boolean>>
}) => {
  const { user } = useUserStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    interests: [] as string[],
    experience: '',
    note: '',
  });

  const handleToggleInterest = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(topic)
        ? prev.interests.filter(t => t !== topic)
        : [...prev.interests, topic],
    }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  const handleSubmit = () => {
    setOpen(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Welcome, {user?.fullName?.split(' ')[0]} 👋</h2>
          <p className="text-muted-foreground">Let’s personalize your learning journey in just a few steps.</p>
          <Button onClick={handleNext}>Start</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What’s your main goal?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map(goal => (
              <Button
                key={goal}
                variant={formData.goal === goal ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, goal }))}
              >
                {goal}
              </Button>
            ))}
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext} disabled={!formData.goal}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What topics interest you most?</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <Badge
                key={topic}
                variant={formData.interests.includes(topic) ? 'default' : 'outline'}
                className={cn("cursor-pointer", {
                  "bg-primary text-white": formData.interests.includes(topic),
                })}
                onClick={() => handleToggleInterest(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext} disabled={formData.interests.length === 0}>Next</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What’s your current experience level?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {levels.map(level => (
              <Button
                key={level}
                variant={formData.experience === level ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
              >
                {level}
              </Button>
            ))}
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext} disabled={!formData.experience}>Next</Button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Tell us anything else you'd like to share</h3>
          <CustomInput
            name="note"
            label="Note"
            isTextArea
            placeholder="Write any extra info here..."
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
          />
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Review</Button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Review & Confirm 🎓</h3>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li><strong>Goal:</strong> {formData.goal}</li>
            <li><strong>Topics:</strong> {formData.interests.join(', ')}</li>
            <li><strong>Experience:</strong> {formData.experience}</li>
            <li><strong>Note:</strong> {formData.note || 'None'}</li>
          </ul>
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button onClick={handleSubmit} className="bg-primary text-white">Finish Onboarding</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentOnboarding;



export const StudentOnboardingModal = () => {
    const [open, setOpen] = useState(false)

    const isNewUser = false

    return (
        <CenterModal
            open={open}
            setOpen={setOpen}
            triggerBtn={
                 <p
            className="mt-2 cursor-pointer inline-block text-primary font-semibold underline"
          >
            {isNewUser ? 'Setup your learning experience' : 'Review your learning plan'}
          </p>
            }
        >
            <StudentOnboarding setOpen={setOpen}/>
        </CenterModal>
    )
}