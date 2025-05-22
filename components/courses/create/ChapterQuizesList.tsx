'use client';

import React, { Dispatch, SetStateAction } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types'; // assumes each quiz has id, question, position
import { Grid, Layout, LayoutDashboard, LayoutGrid } from 'lucide-react';
import { TextButton } from '@/components/shared/CustomButton';

type Props = {
  quizzes: QuizQuestion[];
  setEdit:  (quiz:QuizQuestion)=>void
};

const ChapterQuestionsList: React.FC<Props> = ({ quizzes, setEdit }) => {
  const [items, setItems] = React.useState<QuizQuestion[]>(() =>
    [...quizzes].sort((a, b) => a.position - b.position)
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex).map((quiz, index) => ({
      ...quiz,
      position: index,
    }));

    setItems(reordered);
    // You can call an `onSubmit(reordered)` here
  };

  return (
    <div className="space-y-2">

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((q) => q.id)} strategy={verticalListSortingStrategy}>
          {items.map((quiz) => (
            <SortableQuizItem key={quiz.id} quiz={quiz} onEdit={() => setEdit(quiz)} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ChapterQuestionsList;

type SortableQuizItemProps = {
  quiz: QuizQuestion;
  onEdit: () => void;
};

const SortableQuizItem: React.FC<SortableQuizItemProps> = ({ quiz, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: quiz.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      
      style={style}
      className="flex items-center justify-between p-3 gap-2 rounded-md border bg-white shadow-sm cursor-pointer hover:bg-gray-50"
    >
      <LayoutGrid {...listeners} className='cursor-grab w-4 h-8 text-gray-500' />
      <p className="text-  flex-1 text-gray-800 line-clamp-1">{quiz.question}</p>
      <TextButton size="sm" editType='edit' onClick={onEdit} />
    </div>
  );
};
