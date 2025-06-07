// BadgeSelector.tsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { badges } from "@/data";
import EditBadgeModal from "./EditBadgeModal";

interface BadgeSelectorProps {
  initialSelected?: string;
  onSelect: (badge: typeof badges[0]) => void;
}

const categoryColors: Record<number, string> = {
  1: "#38bdf8", // Sky
  2: "#facc15", // Yellow
  3: "#f97316", // Orange
  4: "#10b981", // Green
  5: "#8b5cf6", // Violet
};

export default function ModuleBadgeSetup({ initialSelected, onSelect }: BadgeSelectorProps) {
  const [selectedAlias, setSelectedAlias] = useState(initialSelected);
  const [captions, setCaptions] = useState<Record<string, string>>({});

  const handleSelect = (badge: typeof badges[0]) => {
    setSelectedAlias(badge.alias);
    onSelect({ ...badge, description: captions[badge.alias] || badge.description });
  };

  return (
    <div className="space-y-6">
      {/* <h2 className="text-xl font-semibold">Select a Badge for Your Module</h2> */}
      <p className="font-  text-  text-gray-700 ">
        Badges are grouped by tiers, reflecting the progression and level of your course modules.  
        Each tier corresponds to a module’s position in the learning path — helping motivate learners to advance through each stage.  
        Browse the categories, select a badge that fits your module’s level, and customize it as needed.
      </p>


      {[1, 2, 3, 4, 5].map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-bold" style={{ color: categoryColors[category] }}>
            {badges.find((b) => b.category === category)?.categoryVibe} (Tier {category})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.filter((b) => b.category === category).map((badge) => (
                <EditBadgeModal 
                    badge={badge}
                    trigger={
                        <div
                            key={badge.alias}
                            onClick={() => handleSelect(badge)}
                            className={cn(
                            "border p-4 rounded-lg cursor-pointer transition-all shadow-sm",
                            selectedAlias === badge.alias
                                ? "ring-2 ring-offset-2 ring-black bg-muted"
                                : "hover:shadow-md"
                            )}
                        >
                            <div
                            className="text-4xl mb-2"
                            style={{ color: categoryColors[category] }}
                            >
                            {badge.icon}
                            </div>
                            <h4 className="font-semibold text-lg">{badge.label}</h4>
                            <p className="text-sm text-muted-foreground">
                            {badge.description}
                            </p>
                        </div>
                    }
                />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
