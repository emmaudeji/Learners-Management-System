"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TextButton } from "@/components/shared/CustomButton";
import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import {
  CheckCheck,
  LayoutGrid,
  PenLine,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import CardWrapper from "@/components/shared/CardWrapper";

const MIN_OBJECTIVE_LENGTH = 5;

export const CourseObjectivesForm = ({ course }: { course: Course }) => {
  const initialObjectives = course.objectives || [];
  const [objectives, setObjectives] = useState<string[]>(initialObjectives);
  const [newObjective, setNewObjective] = useState("");
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialObjectives.length);
  const [isSave, setIsSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddObjective = () => {
    if (newObjective.trim().length < MIN_OBJECTIVE_LENGTH) {
      setError("Objective must be at least 5 characters.");
      return;
    }

    setObjectives((prev) => [...prev, newObjective.trim()]);
    setNewObjective("");
    setError("");
    setIsSave(true)
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
    setIsSave(true)

  };

  const handleEditClick = (index: number, currentValue: string) => {
    setEditIndex(index);
    setEditValue(currentValue);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim().length < MIN_OBJECTIVE_LENGTH) {
      toast.error("Edited objective must be at least 5 characters.");
      return;
    }

    const updated = [...objectives];
    updated[index] = editValue.trim();
    setObjectives(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const handleSaveObjectives = async () => {
    if (!objectives.length) {
      toast.error("Please add at least one objective.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { objectives },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update objectives.");
        setObjectives(initialObjectives);
        return;
      }

      toast.success("Objectives updated!");
      setIsEdit(false);
      setIsSave(false)
    } catch {
      toast.error("Something went wrong. Please try again.");
      setObjectives(initialObjectives);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = objectives.findIndex((_, i) => i.toString() === active.id);
    const newIndex = objectives.findIndex((_, i) => i.toString() === over.id);
    setObjectives((items) => arrayMove(items, oldIndex, newIndex));

    setIsSave(true)
  };

  return (
    <CardWrapper className=" space-y-4">
      <CustomInput
        label="Add Course Objective"
        description="Add clear, concise learning outcomes for this course."
        placeholder="e.g., Understand the basics of React."
        value={newObjective}
        error={error}
        disabled={!isEdit || isLoading}
        onChange={(e) => setNewObjective(e.target.value)}
      />

      {isEdit && (
        <TextButton
          type="button"
          onClick={handleAddObjective}
          variant="outline"
          className="text-sm"
          disabled={isLoading}
          editType="add"
        >
          Add New Objective
        </TextButton>
      )}

      {objectives.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={objectives.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2 text-sm">
              {objectives.map((obj, index) => (
                <SortableObjectiveItem
                  key={index}
                  id={index.toString()}
                  obj={obj}
                  index={index}
                  isEdit={isEdit}
                  editIndex={editIndex}
                  editValue={editValue}
                  isLoading={isLoading}
                  setEditValue={setEditValue}
                  handleSaveEdit={handleSaveEdit}
                  handleCancelEdit={handleCancelEdit}
                  handleEditClick={handleEditClick}
                  handleRemoveObjective={handleRemoveObjective}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <div className="flex items-center justify-between pt-2">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Plus size={14} />
            Edit objectives
          </button>
        )}

        {/* fix this truthy */}

        {(isEdit && JSON.stringify(objectives) !== JSON.stringify(initialObjectives)) || isSave && (
          <Button
            type="button"
            onClick={handleSaveObjectives}
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Objectives"}
          </Button>
        )}
      </div>
    </CardWrapper>
  );
};

// Sortable Objective Item
const SortableObjectiveItem = ({
  id,
  obj,
  index,
  isEdit,
  editIndex,
  editValue,
  setEditValue,
  handleSaveEdit,
  handleRemoveObjective,
  handleEditClick,
  handleCancelEdit,
  isLoading,
}: {
  id: string;
  obj: string;
  index: number;
  isEdit: boolean;
  editIndex: number | null;
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
  handleSaveEdit: (index: number) => void;
  handleRemoveObjective: (index: number) => void;
  handleEditClick: (index: number, obj: string) => void;
  handleCancelEdit: () => void;
  isLoading: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex justify-between bg-white p-2 rounded shadow-sm border gap-2 items-center",
        { "opacity-50": !isEdit }
      )}
      {...attributes}
    >
      <LayoutGrid
        size={20}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-800"
      />
      <div className="flex-1">
        {editIndex === index ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            disabled={isLoading}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        ) : (
          <span>{obj}</span>
        )}
      </div>
      {isEdit && (
        <div className="flex items-center gap-2 pl-2">
          {editIndex === index ? (
            <>
              <button
                onClick={() => handleSaveEdit(index)}
                className="text-green-600 hover:text-green-800"
                disabled={isLoading}
              >
                <CheckCheck size={16} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditClick(index, obj)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit objective"
              >
                <PenLine size={16} />
              </button>
              <button
                onClick={() => handleRemoveObjective(index)}
                className="text-red-500 hover:text-red-700"
                title="Remove objective"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
};








// "use client";

// import { TextButton } from "@/components/shared/CustomButton";
// import { CustomInput } from "@/components/shared/CustomInput";
// import { Button } from "@/components/ui/button";
// import { fields } from "@/constants";
// import { appwriteConfig } from "@/lib/actions/config";
// import { Course } from "@/types";
// import { putRequest } from "@/utils/api";
// import { PenLine, Plus, Trash2, Check, X } from "lucide-react";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const MIN_OBJECTIVE_LENGTH = 5;

// export const CourseObjectivesForm = ({ course }: { course: Course }) => {
//   const initialObjectives = course.objectives || [];
//   const [objectives, setObjectives] = useState<string[]>(initialObjectives);
//   const [newObjective, setNewObjective] = useState("");
//   const [error, setError] = useState("");
//   const [isEdit, setIsEdit] = useState(!initialObjectives.length);
//   const [isLoading, setIsLoading] = useState(false);

//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editValue, setEditValue] = useState("");

//   const handleAddObjective = () => {
//     if (newObjective.trim().length < MIN_OBJECTIVE_LENGTH) {
//       setError("Objective must be at least 5 characters.");
//       return;
//     }

//     setObjectives((prev) => [...prev, newObjective.trim()]);
//     setNewObjective("");
//     setError("");
//   };

//   const handleRemoveObjective = (index: number) => {
//     setObjectives((prev) => prev.filter((_, i) => i !== index));
//     if (editIndex === index) {
//       setEditIndex(null);
//       setEditValue("");
//     }
//   };

//   const handleEditClick = (index: number, currentValue: string) => {
//     setEditIndex(index);
//     setEditValue(currentValue);
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(null);
//     setEditValue("");
//   };

//   const handleSaveEdit = (index: number) => {
//     if (editValue.trim().length < MIN_OBJECTIVE_LENGTH) {
//       toast.error("Edited objective must be at least 5 characters.");
//       return;
//     }

//     const updated = [...objectives];
//     updated[index] = editValue.trim();
//     setObjectives(updated);
//     setEditIndex(null);
//     setEditValue("");
//   };

//   const handleSaveObjectives = async () => {
//     if (!objectives.length) {
//       toast.error("Please add at least one objective.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const { error } = await putRequest({
//         body: {
//           collectionId: appwriteConfig.coursesCollectionId,
//           documentId: course.id,
//           formData: { objectives },
//           fields: fields.courses,
//         },
//       });

//       if (error) {
//         toast.error(error || "Failed to update objectives.");
//         setObjectives(initialObjectives);
//         return;
//       }

//       toast.success("Objectives updated!");
//       setIsEdit(false);
//     } catch {
//       toast.error("Something went wrong. Please try again.");
//       setObjectives(initialObjectives);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 w-full bg-slate-50 rounded-md border space-y-4">
//       <CustomInput
//         label="Add Course Objective"
//         description="Add clear, concise learning outcomes for this course."
//         placeholder="e.g., Understand the basics of React."
//         value={newObjective}
//         error={error}
//         disabled={!isEdit || isLoading}
//         onChange={(e) => setNewObjective(e.target.value)}
//       />

//       {isEdit && (
//         <TextButton
//           type="button"
//           onClick={handleAddObjective}
//           variant="outline"
//           className="text-sm"
//           disabled={isLoading}
//           editType="add"
//         >
//           Add new objective
//         </TextButton>
//       )}

//       {objectives.length > 0 && (
//         <ul className="space-y-2 text-sm">
//           {objectives.map((obj, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-start bg-white p-2 rounded shadow-sm border"
//             >
//               <div className="flex-1">
//                 {editIndex === index ? (
//                   <input
//                     value={editValue}
//                     onChange={(e) => setEditValue(e.target.value)}
//                     className="w-full p-1 text-sm border rounded"
//                     disabled={isLoading}
//                     autoFocus
//                   />
//                 ) : (
//                   <span>{obj}</span>
//                 )}
//               </div>

//               {isEdit && (
//                 <div className="flex items-center gap-2 pl-2">
//                   {editIndex === index ? (
//                     <>
//                       <button
//                         onClick={() => handleSaveEdit(index)}
//                         className="text-green-600 hover:text-green-800"
//                         disabled={isLoading}
//                       >
//                         <Check size={16} />
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="text-gray-500 hover:text-gray-700"
//                         disabled={isLoading}
//                       >
//                         <X size={16} />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => handleEditClick(index, obj)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="Edit objective"
//                       >
//                         <PenLine size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveObjective(index)}
//                         className="text-red-500 hover:text-red-700"
//                         title="Remove objective"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className="flex items-center justify-between pt-2">
//         {!isEdit && (
//           <TextButton
//             type="button"
//             onClick={() => setIsEdit(true)}
//             editType="edit"
//             className="flex items-center gap-1 text-sm text-green-700 hover:underline"
//           >
//             Edit objectives
//           </TextButton>
//         )}

//         {isEdit && JSON.stringify(objectives) !== JSON.stringify(initialObjectives) && (
//           <Button
//             type="button"
//             onClick={handleSaveObjectives}
//             variant="outline"
//             disabled={isLoading}
//             className="bg-green-50 border border-green-700"
//           >
//             {isLoading ? "Saving..." : "Save Objectives"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };
