// app/draggable-list/DraggableList.tsx
'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card } from '@/components/ui/card';

interface Item {
  id: string;
  label: string;
  order: number;
}

interface ItemCardProps {
  label: string;
}

export function ItemCard({ label }: ItemCardProps) {
  return (
    <Card className="p-4 shadow-md bg-white rounded-md">
      <p className="text-gray-800">{label}</p>
    </Card>
  );
}

export default function DraggableList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
    //   const { data, error } = await supabase
    //     .from('items')
    //     .select('*')
    //     .order('order', { ascending: true });

    //   if (error) {
    //     console.error('Error fetching items:', error);
    //   } else {
    //     setItems(data || []);
    //   }
    };

    fetchItems();
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    // Update order locally
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(reorderedItems);

    // Persist new order to Supabase
    const updates = reorderedItems.map(({ id, order }) => ({ id, order }));
    // const { error } = await supabase
    //   .from('items')
    //   .upsert(updates, { onConflict: 'id' });

    // if (error) {
    //   console.error('Error updating item order:', error);
    // }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div
            className="space-y-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ItemCard label={item.label} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
