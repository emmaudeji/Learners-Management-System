'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';

type CheckoutPageProps = {
    courseAlias:string,
  course: {
    title: string;
    instructor: string;
    price: number;
    discountPrice?: number;
    thumbnailUrl?: string;
  };
};

export default function CheckoutPage({ course, courseAlias }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {push} = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form validation & submission logic
    toast('Order submitted! (Demo)');
    push(`/payment/success?courseId=${courseAlias}`); // Redirect to success page
    // Reset form   

  };

  const price = course.discountPrice ?? course.price;
  const discountApplied = !!course.discountPrice;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 py-20">
      {/* Left: Form */}
      <div className="md:col-span-7 px-6 ">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Payment Section */}
          <fieldset>
            <legend className="text-lg font-semibold mb-4">Payment Details</legend>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <Input
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                // InputMode="numeric"
                pattern="[0-9\s]{13,19}"
              />
            </div>

            {/* Expiry Date & CVV */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <Input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <Input
                  type="password"
                  name="cvv"
                  id="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  maxLength={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                //   InputMode="numeric"
                  pattern="\d{3,4}"
                />
              </div>
            </div>

            {/* Billing ZIP */}
            <div className="mt-4">
              <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700">
                Billing ZIP / Postal Code
              </label>
              <Input
                type="text"
                name="billingZip"
                id="billingZip"
                value={formData.billingZip}
                onChange={handleChange}
                required
                placeholder="12345"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </fieldset>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!formData.fullName || !formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.billingZip}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
          >
            Complete Purchase
          </Button>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="md:col-span-5 p-6 bg-slate-50 md:rounded-lg border ">
        <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

        <div className="flex gap-4 items-center mb-6">
          {course.thumbnailUrl && (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-20 h-12 border rounded object-cover"
              width={80}
              height={48}
             />
          )}
          <div>
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-gray-600 text-sm">by {course.instructor}</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span className={discountApplied ? 'line-through text-gray-400' : ''}>
              ${course.price.toFixed(2)}
            </span>
          </div>
          {discountApplied && (
            <div className="flex justify-between font-semibold text-indigo-600">
              <span>Discounted Price</span>
              <span>${course.discountPrice!.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3">
            <span>Total</span>
            <span>${price.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          By completing this purchase, you agree to our{' '}
          <a href="/terms" className="text-indigo-600 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-indigo-600 underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
