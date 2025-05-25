'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { putRequest } from '@/utils/api'; // your server function
import { CustomToggler } from '@/components/shared/Toggler';

export default function ChapterAccessToggle({
  initialValue,
  collectionId,
  documentId,
}: {
  initialValue: boolean;
  collectionId: string;
  documentId: string;
}) {
  const [isFree, setIsFree] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (newValue: boolean) => {
    const prev = isFree;
    setIsFree(newValue); // Optimistic UI
    setLoading(true);

    const { error } = await putRequest({
      body: {
        collectionId,
        documentId,
        formData: { isFree: newValue },
      },
    });

    if (error) {
      toast.error('Failed to update access level.');
      setIsFree(prev); // Rollback
    } else {
      toast.success(`Chapter marked as ${newValue ? 'Free' : 'Paid'}.`);
    }

    setLoading(false);
  };

  return (
 

    <CustomToggler
      value={isFree}
      options={[false, true]}
      labels={['Paid', 'Free']}
    label="Is this chapter free to access?"

      onToggle={handleToggle}
      loading={loading}
      />
 
  );
}
