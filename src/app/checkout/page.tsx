'use client';

import React, { Suspense } from 'react';
import Summary from '@/components/Summary/Summary';
import Form from '@/components/Form/Form';
import { motion } from 'framer-motion';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-dark-salmon"></div>
    </div>
  );
};

const CheckoutContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
        },
      }}
      className="m-auto lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] lg:py-[160px] md:py-[120px] sm:py-[64px] flex lg:flex-row md:flex-col sm:flex-col lg:gap-x-[30px] gap-y-8"
    >
      <div className="lg:flex-[2] w-full bg-white rounded-lg p-12 flex flex-col gap-y-8">
        <h3 className="text-[32px]">Checkout</h3>
        <Form />
      </div>
      <div className="lg:flex-1 w-full bg-white rounded-lg p-8">
        <Summary />
      </div>
    </motion.div>
  );
};

const Checkout: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;