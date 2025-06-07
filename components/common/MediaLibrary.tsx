// components/MediaLibrary.tsx
"use client";

import { getMediaFromCloudinary } from "@/lib/helper";
import { useEffect, useState } from "react";
import CenterModal from "../shared/CenterModal";
import { useUserStore } from "@/store/useUserStore";
import { getRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { fields } from "@/constants";
import { Media } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CustomButton } from "../shared/CustomButton";
import { set } from "date-fns";

// interface MediaItem {
//   asset_id: string;
//   public_id: string;
//   secure_url: string;
//   format: string;
//   resource_type: string;
// }

interface MediaLibraryProps {
  folder: string;
  updateMedia: (media: Media) => Promise<void>;
}

export function MediaLibrary({ folder,  updateMedia }: MediaLibraryProps) {
  const {user} = useUserStore()
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [updating, setUpdating] = useState(true);

  const handleSubmit = async () => {
    if (!selectedMedia) {
      setError("Please select a media item.");
      return;
    }
    setUpdating(true);
    setError("");
    await updateMedia(selectedMedia);
    setUpdating(false);
    setSelectedMedia(null);
  }

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        // const res = await getMediaFromCloudinary(folder);
        const {data:res} = await getRequest<{data:Media[], error?: string}>({
          body: {
            collectionId: appwriteConfig.mediaCollectionId,
            param: {
              createdBy: user?.id!,
              limit: 100,
            },
            fields: ['url', 'type', 'fileName', 'alias', 'collection', 'usedFor', 'mimeType'],
          },
        });
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
console.log("Media items:", media);
  return (
    <section className="w-full max-w-4xl mx-auto  ">
      <div className="px-4 pb-4 border-b w-full">
        <h6 className="font-semibold text-lg">Media Library</h6>
        <p className="">Select an item for the cover photo</p>
      </div>

      {
        selectedMedia && (
          <div className="px-4 py-2 bg-slate-50">
            <p className="text-sm text-gray-600">Selected: {selectedMedia.fileName}</p>
            <CustomButton
              isLoading={updating}
              onClick={handleSubmit}
              className="h-8 px-2"
              loadingText="Updating..."
            >
              Use Selected Media
            </CustomButton>
          </div>
        )}          
  
      <div className="bg-slate-50 w-full border-t grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {media.map((item) => (
        <div
          onClick={() => {
            setSelectedMedia(item);
            setUpdating(false);
          }}
          key={item.id!}
          className={cn("cursor-pointer border rounded-md hover:shadow-md transition", selectedMedia?.id=== item.id ? "ring-primary ring-2" : "")}>
            <Image
              src={item.url}
              alt={item.fileName!}
              className="rounded-md w-full h-32 object-cover"
              width={128}
              height={128}
              loading="lazy"
              unoptimized
              placeholder="blur"
              blurDataURL={item.url} // Use the same URL for blur effect
            />
           
        </div>
      ))}
    </div>
    </section>
  );
}


export const MediaModal = ({updateMedia, triger}:{
    updateMedia: (media: Media) => Promise<void>;
    triger:React.ReactNode
}) => {
    const [open, setOpen] = useState(false);
    const {user} = useUserStore()

    return (
        <CenterModal
            className="p-0"
            open={open}
            setOpen={setOpen}
            triggerBtn={
                triger
            }
        >
            <MediaLibrary folder={user?.id!} updateMedia={updateMedia}/>
        </CenterModal>
    )
}




// fix for xloudinary

// export function MediaLibrary({ folder, onSelect }: MediaLibraryProps) {
//   const {user} = useUserStore()
//   const [media, setMedia] = useState<MediaItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMedia = async () => {
//       setLoading(true);
//       try {
//         // const res = await getMediaFromCloudinary(folder);
//         const {data:res} = await getRequest<{data:MediaItem[], error?: string}>({
//           body: {
//             collectionId: appwriteConfig.mediaCollectionId,
//             param: {
//               createdBy: user?.id!,
//               limit: 100,
//             },
//             fields: ['url', 'type', 'fileName', 'alias', 'collection', 'usedFor', 'mimeType'],
//           },
//         });
//         setMedia(res);
//       } catch (err) {
//         setError("Failed to fetch media.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedia();
//   }, [folder]);

//   if (loading) return <p className="text-center text-sm text-gray-500">Loading media...</p>;
//   if (error) return <p className="text-red-600 text-center">{error}</p>;
//   if (media.length === 0) return <p className="text-center text-gray-500">No media found in "{folder}"</p>;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
//       {media.map((item) => (
//         <div
//           key={item.asset_id}
//           className="cursor-pointer border rounded-md p-1 hover:shadow-md transition"
//           onClick={() => onSelect(item)}
//         >
//           {item.resource_type === "image" ? (
//             <img
//               src={item.secure_url}
//               alt={item.public_id}
//               className="rounded-md w-full h-32 object-cover"
//             />
//           ) : (
//             <div className="h-32 flex items-center justify-center text-sm text-gray-600 bg-gray-100 rounded-md">
//               {item.public_id.split("/").pop()}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
