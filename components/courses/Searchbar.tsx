"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search by title or instructor..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 p-3 border rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
