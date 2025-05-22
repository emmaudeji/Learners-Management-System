'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { generateSlug } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/shared/CustomInput';
import CustomSelect from '@/components/shared/CustomSelect';
import { Chapter, QuizQuestion } from '@/types';

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';
type Difficulty = 'easy' | 'medium' | 'hard';

type ChapterQuizFormProps = {
  quiz?: QuizQuestion;
  chapter:Chapter
  nextPosition: number;
  onSuccess: (newQuiz: QuizQuestion) => void;
};

export default function ChapterQuizForm({
  quiz,
  nextPosition,
  onSuccess,
  chapter
}: ChapterQuizFormProps) {
 
    const initialForm = quiz ? {
        question: quiz.question,
        type: quiz.type,
        options: quiz.options,
        explanation: quiz.explanation,
        difficulty: quiz.difficulty,
        tags: quiz.tags.join(', '),
        correctAnswer: quiz.correctAnswer,
        position:quiz.position,
    } :
    {
        question: '',
        type: 'multiple-choice' as QuestionType,
        options: [''],
        explanation: '',
        difficulty: 'easy' as Difficulty,
        tags: '',
        correctAnswer: [] as string[],
        position: nextPosition,
    }

  const { user } = useUserStore();
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const toggleCorrectAnswer = (value: string) => {
    setForm((prev) => {
      const updated = prev.correctAnswer.includes(value)
        ? prev.correctAnswer.filter((ans) => ans !== value)
        : [...prev.correctAnswer, value];
      return { ...prev, correctAnswer: updated };
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()),
        createdBy: user?.id,
        alias: generateSlug(form.question),
        status: "ACTIVE",
        chapter:chapter.alias
      };

      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create quiz question.');
      const data = await res.json();

      setSuccess(true);
      onSuccess(data); // Notify parent
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomInput
          isTextArea
          placeholder="Enter your question"
          value={form.question}
          onChange={(e) => handleChange('question', e.target.value)}
          required
          label="Question"
          description="Write a clear and concise question that tests understanding of a specific topic."
        />

        <CustomSelect
          options={[
            { value: 'multiple-choice', label: 'Multiple Choice' },
            { value: 'true-false', label: 'True / False' },
            { value: 'short-answer', label: 'Short Answer' },
          ]}
          name="type"
          value={form.type}
          onChange={(type) => handleChange('type', type)}
          label="Choose how users will answer this question."
          required
        />

        {form.type === 'multiple-choice' && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Options</Label>
            <p className="text-sm text-muted-foreground">
              Add at least 2 options. Tick the box for each correct answer.
            </p>
            {form.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <CustomInput
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1"
                />
                <Checkbox
                  checked={form.correctAnswer.includes(option)}
                  onCheckedChange={() => toggleCorrectAnswer(option)}
                />
                <span className="text-sm text-muted-foreground">Correct</span>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addOption}>
              + Add Option
            </Button>
          </div>
        )}

        <CustomInput
          label="Explanation"
          description="(Optional) Provide a short explanation for the correct answer to help learners understand."
          isTextArea
          placeholder="Explain the correct answer..."
          value={form.explanation || ''}
          onChange={(e) => handleChange('explanation', e.target.value)}
        />

        <CustomSelect
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
          ]}
          name="difficulty"
          value={form.difficulty}
          onChange={(e) => handleChange('difficulty', e)}
          label="How challenging is this question for the average learner?"
        //   description="How challenging is this question for the average learner?"
          required
        />

        <CustomInput
          label="Tags"
          description="Comma-separated keywords (e.g., algebra, trigonometry, logic) to group and filter questions."
          placeholder="Comma-separated tags"
          value={form.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Save Quiz'}
        </Button>
      </form>
    </div>
  );
}
