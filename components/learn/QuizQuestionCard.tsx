'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/types';

interface QuizProps {
  question: QuizQuestion;
  onSubmitAnswer?: (answer: {
    selectedAnswer: string[];
    isCorrect: boolean;
  }) => void;
}

export default function QuizQuestionCard({ question, onSubmitAnswer }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [shortAnswer, setShortAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedAnswer((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    const userAnswer =
      question.type === 'short-answer' ? [shortAnswer.trim()] : selectedAnswer;

    const correct = arraysEqualIgnoreOrder(
      userAnswer.map((s) => s.toLowerCase()),
      question.correctAnswer.map((s) => s.toLowerCase())
    );

    setIsCorrect(correct);
    setSubmitted(true);
    onSubmitAnswer?.({ selectedAnswer: userAnswer, isCorrect: correct });
  };

  return (
    <div className="border rounded-xl p-6 space-y-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold">{question.question}</h2>

      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label
              key={option}
              className={cn(
                'flex items-center gap-3 p-2 border rounded-md cursor-pointer',
                selectedAnswer.includes(option) && 'bg-muted'
              )}
            >
              <Checkbox
                checked={selectedAnswer.includes(option)}
                onCheckedChange={() => handleSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'true-false' && (
        <div className="flex gap-4">
          {['True', 'False'].map((opt) => (
            <label
              key={opt}
              className={cn(
                'flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer',
                selectedAnswer.includes(opt) && 'bg-muted'
              )}
            >
              <Checkbox
                checked={selectedAnswer.includes(opt)}
                onCheckedChange={() => setSelectedAnswer([opt])}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {question.type === 'short-answer' && (
        <Input
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          placeholder="Type your answer..."
        />
      )}

      {!submitted && (
        <Button onClick={handleSubmit} disabled={question.type !== 'short-answer' && selectedAnswer.length === 0}>
          Submit Answer
        </Button>
      )}

      {submitted && (
        <div className="space-y-2">
          <p className={cn('text-sm font-medium', isCorrect ? 'text-green-600' : 'text-red-600')}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          {question.explanation && (
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Helper to compare string arrays (order insensitive)
function arraysEqualIgnoreOrder(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const norm = (arr: string[]) => arr.map((x) => x.trim().toLowerCase()).sort();
  return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}
