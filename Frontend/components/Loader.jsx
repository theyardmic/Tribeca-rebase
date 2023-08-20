// Loader.js
import React from 'react';
import { useLoading } from './LoadingContext';

const Loader = () => {
  const { isLoading } = useLoading();

  return (
    isLoading && (
      <div className="absolute top-0 left-0 w-full h-full bg-white/[0.7] flex flex-col gap-5 justify-center items-center">
        <img src="/logo.svg" width={150} alt="Logo" />
        <span className="text-4xl text-[#BF330E] font-bold">Loading...</span>
      </div>
    )
  );
};

export default Loader;
