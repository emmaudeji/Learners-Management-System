'use client';

import React, { useEffect, useState } from 'react';
import ChapterQuizForm from './ChapterQuizForm';
import { QuizQuestion, Chapter } from '@/types';
import { Button } from '@/components/ui/button';
import ChapterQuestionsList from './ChapterQuizesList';
import { TextButton } from '@/components/shared/CustomButton';


const ChapterQuizeWrapper = ({ chapter }: { chapter: Chapter }) => {
  const [quiz, setQuiz] = useState<QuizQuestion | undefined>();
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(dummyQuizQuestions);
  const [mode, setMode] = useState<'list' | 'form'>(
    quizzes.length === 0 ? 'form' : 'list'
  );

  // useEffect(() => {
 
  // }, [chapter])

  const handleCreateSuccess = (newQuiz: QuizQuestion) => {
    setQuizzes((prev) => [...prev, newQuiz]);
    setMode('list');
    setQuiz(undefined);
  };

  const handleEdit = (quiz: QuizQuestion) => {
    setQuiz(quiz);
    setMode('form');
  };

  const handleAddNew = () => {
    setQuiz(undefined);
    setMode('form');
  };

  return (
    <section className="p-4 space-y-3  ">
      {mode === 'list' ? (
        <>
          <TextButton onClick={handleAddNew} className='justify-self-end mb-4' >+ Add New Question</TextButton>
          {quizzes.length > 0 ? (
            <ChapterQuestionsList quizzes={quizzes} setEdit={handleEdit} />
          ) : (
            <div className="text-center text-gray-500 py-12 border rounded-md">
              <p>No questions yet.</p>
              <TextButton className="mt-4" onClick={handleAddNew} >
                Add your first question
              </TextButton>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="mb-4">
            <TextButton variant="outline" onClick={() => setMode('list')} className=''>
              ← Back to Questions List
            </TextButton>
          </div>
          <ChapterQuizForm
            chapter={chapter}
            quiz={quiz}
            nextPosition={quizzes.length + 1}
            onSuccess={handleCreateSuccess}
          />
        </div>
      )}
    </section>
  );
};

export default ChapterQuizeWrapper;
 

export const dummyQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    alias: "capital-of-france",
    chapter: { id: "ch1", label: "Geography", alias: "geography" } as any,
    question: "What is the capital of France?",
    position: 0,
    type: "multiple-choice",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    explanation: "Paris is the capital and most populous city of France.",
    difficulty: "easy",
    tags: ["geography", "europe"],
    correctAnswer: ["Paris"],
    createdBy: { id: "u1", name: "Teacher A" } as any,
    status: "ACTIVE",
    createdAt: "2025-01-01T10:00:00Z",
    $createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-02T10:00:00Z",
    permissions: ["read", "write"],
  },
  {
    id: "q2",
    alias: "photosynthesis-process",
    chapter: { id: "ch1", label: "Biology", alias: "biology" } as any,
    question: "Define the process of photosynthesis in simple terms.",
    position: 1,
    type: "short-answer",
    options: [],
    explanation: "Photosynthesis is the process by which plants use sunlight to make food.",
    difficulty: "medium",
    tags: ["biology", "plants"],
    correctAnswer: ["Plants use sunlight to make food", "Using sunlight, plants produce energy"],
    createdBy: { id: "u2", name: "Teacher B" } as any,
    status: "DRAFT",
    createdAt: "2025-01-05T14:00:00Z",
    $createdAt: "2025-01-05T14:00:00Z",
    updatedAt: "2025-01-06T08:00:00Z",
    permissions: ["read"],
  },
  {
    id: "q3",
    alias: "earth-round",
    chapter: { id: "ch2", label: "Astronomy", alias: "astronomy" } as any,
    question: "Is the Earth round?",
    position: 2,
    type: "true-false",
    options: ["True", "False"],
    explanation: "The Earth is an oblate spheroid, which is nearly round.",
    difficulty: "easy",
    tags: ["astronomy", "earth"],
    correctAnswer: ["True"],
    createdBy: { id: "u1", name: "Teacher A" } as any,
    status: "ACTIVE",
    createdAt: "2025-01-10T09:00:00Z",
    $createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-11T11:00:00Z",
    permissions: ["read", "write"],
  },
];
