// components/MediaLibrary.tsx
"use client";

import { getMediaFromCloudinary } from "@/lib/helper";
import { useEffect, useState } from "react";
import CenterModal from "../shared/CenterModal";
import { useUserStore } from "@/store/useUserStore";

interface MediaItem {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
}

interface MediaLibraryProps {
  folder: string;
  onSelect: (media: MediaItem) => void;
}

export function MediaLibrary({ folder, onSelect }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await getMediaFromCloudinary(folder);
        setMedia(res);
      } catch (err) {
        setError("Failed to fetch media.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [folder]);

  if (loading) return <p className="text-center text-sm text-gray-500">Loading media...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (media.length === 0) return <p className="text-center text-gray-500">No media found in "{folder}"</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {media.map((item) => (
        <div
          key={item.asset_id}
          className="cursor-pointer border rounded-md p-1 hover:shadow-md transition"
          onClick={() => onSelect(item)}
        >
          {item.resource_type === "image" ? (
            <img
              src={item.secure_url}
              alt={item.public_id}
              className="rounded-md w-full h-32 object-cover"
            />
          ) : (
            <div className="h-32 flex items-center justify-center text-sm text-gray-600 bg-gray-100 rounded-md">
              {item.public_id.split("/").pop()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export const MediaModal = ({onSelect, triger}:{
    onSelect: (media: MediaItem) => void;
    triger:React.ReactNode
}) => {
    const [open, setOpen] = useState(false);
    const {user} = useUserStore()

    return (
        <CenterModal
            open={open}
            setOpen={setOpen}
            triggerBtn={
                triger
            }
        >
            <MediaLibrary folder={user?.id!} onSelect={onSelect}/>
        </CenterModal>
    )
}
