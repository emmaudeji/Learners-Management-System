"use client";
import React from "react";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function Filters({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect("")}
        className={`px-4 py-2 rounded-full border ${selected === "" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${selected === cat ? "bg-blue-600 text-white" : "bg-white text-black"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
