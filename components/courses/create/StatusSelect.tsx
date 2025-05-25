"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverMenu } from "@/components/shared/PopoverMenu";
import { StatusType } from "@/types";
import { statuses } from "@/constants";
import { putRequest } from "@/utils/api";
import { toast } from "react-toastify";


const statusStyleMap: Record<StatusType, string> = {
  DRAFT: "border-gray-500/50 bg-gray-600/10 text-gray-700",
  ACTIVE: "border-green-700/50 bg-green-600/10 text-green-700",
  ARCHIVED: "border-red-700/50 bg-red-600/10 text-red-700",
};

export const StatusSelect = ({
  currentStatus = "DRAFT",
  callback,
  documentId,
  collectionId,
}: {
  currentStatus?: StatusType;
  documentId: string;
  collectionId: string;
  callback?: (status?: StatusType) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const updateSatus = async (newStatus:StatusType) => {
    const initialStatus = status
    try {
        setLoading(true)
        // set the new
        setStatus(newStatus)
        const {data,error} = await putRequest({
            body:{
                collectionId,
                documentId,
                formData:{status},
            }
        })
        if(error){
            toast.error('Status was not updated')
            // if error return the old
            setStatus(initialStatus)
            return
        }
        toast.success('Status was updated')
        callback&&callback(status)

    } catch (error) {
        console.log(error)
    } finally {
       setLoading(false)
    }
  }

  const handleSelect = (newStatus: StatusType) => {
    updateSatus(newStatus);
    setOpen(false);
  };

  return (
    <PopoverMenu
      open={open}
      setOpen={setOpen}
      align="end"
      className="w-36"
      trigerBtn={
        <small
          className={cn(
            "rounded-full px-2 py-1 text-xs border flex items-center gap-1 cursor-pointer",
            statusStyleMap[status]
          )}
        >
          {status}
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronDown className="w-4 h-4" />}
        </small>
      }
    >
      <div className="py-4">
        <div className="pb-2 border-b w-full">
            <p className="text-sm px-4 font-semibold text-muted-foreground mb-2">Change Status</p>
        </div>

        {(statuses as StatusType[]).map((s) => (
          <div
            key={s}
            onClick={() => handleSelect(s)}
            className={cn(
              "px-4 pt-2 rounded-md cursor-pointer text-sm",
              status === s
                ? "bg-muted text-primary font-semibold"
                : "hover:bg-accent"
            )}
          >
            {s}
          </div>
        ))}
      </div>
    </PopoverMenu>
  );
};

export default StatusSelect;
