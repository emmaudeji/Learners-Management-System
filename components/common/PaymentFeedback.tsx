'use client';

import React from 'react';
import Confetti from 'react-confetti';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// This component displays a success message after a payment is completed. But confett
export default function PaymentSuccessMessage({courseAlias}: { courseAlias?: string }) {

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-white text-center px-4">
      <Confetti className='w-full h-full'  recycle={true} numberOfPieces={300} />

      <div className="max-w-md mx-auto space-y-6 ">
        <CheckCircle2 className="text-primary mx-auto w-16 h-16" />
        <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600">
          Thank you for your purchase. A confirmation email has been sent to you.
        </p>
        <Link href={`/learning/${courseAlias}`}  className='block w-full text-center bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors'>
          Start Learning
        </Link>
      </div>
    </div>
  );
}
