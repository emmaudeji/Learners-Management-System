"use client";

import Heading from "@/components/common/Heading";
import { CustomButton } from "@/components/shared/CustomButton";
import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import { DollarSign, Pen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AVAILABLE_CURRENCIES = ["USD", "EUR", "NGN", "GBP"];

const PriceForm = ({ course }: { course: Course }) => {
  const initialPrice = course?.price?.price || 0;
  const initialCurrency = course?.price?.currency || "USD";

  const [price, setPrice] = useState(initialPrice.toString());
  const [currency, setCurrency] = useState(initialCurrency);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(initialPrice === 0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      setError("");
    } else {
      setError("Enter a valid number.");
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice) || numericPrice < 0) {
      setError("Price must be a valid non-negative number.");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: {
            price: {
              price: numericPrice,
              currency,
            },
          },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update price.");
        setPrice(initialPrice.toString());
        setCurrency(initialCurrency);
        return;
      }

      toast.success("Price updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setPrice(initialPrice.toString());
      setCurrency(initialCurrency);
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges =
    price !== initialPrice.toString() || currency !== initialCurrency;

  return (
    <section className="space-y-3 max-w-4xl mx-auto w-full pt-8 pb-20 flex flex-col items-center gap-6">
        <Heading icon={<DollarSign/>} title="Sell your course" />

    <form
      onSubmit={handleSubmit}
      className="p-4 bg-slate-50 rounded-md border space-y-4  w-full max-w-2xl gap-4"
    >
      <CustomInput
        label="Course Price"
        type="number"
        min={0}
        step={0.01}
        description="Set the course price in your selected currency."
        value={price}
        error={error}
        disabled={!isEdit || isLoading}
        onChange={handlePriceChange}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="currency" className="text-sm font-medium">
          Currency
        </label>
        <select
          id="currency"
          className="rounded-md border border-gray-300 p-2 disabled:bg-gray-100"
          value={currency}
          disabled={!isEdit || isLoading}
          onChange={handleCurrencyChange}
        >
          {AVAILABLE_CURRENCIES.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Pen size={14} />
            Edit price
          </button>
        )}

        {isEdit && hasChanges && !isNaN(parseFloat(price)) && (
          <CustomButton type="submit" variant="outline" disabled={isLoading} isLoading={isLoading} loadingText="Saving...">
            Save
          </CustomButton>
        )}
      </div>
    </form>
    </section>
  );
};

export default PriceForm;
