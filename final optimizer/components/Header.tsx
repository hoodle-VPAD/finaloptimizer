import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg flex items-center justify-center h-10 w-10">
                <span className="text-white font-bold text-xl">H</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Hoodle Content Optimizer
            </h1>
        </div>
        <p className="hidden md:block text-slate-500">Powered by Gemini AI</p>
      </div>
    </header>
  );
};