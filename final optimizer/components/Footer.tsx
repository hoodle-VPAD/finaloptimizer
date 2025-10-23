import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 px-4">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Hoodle Content Optimizer. All rights reserved.
      </p>
      <p className="text-xs text-slate-400 mt-2">
        This is generative AI, please be sure to verify all information
      </p>
    </footer>
  );
};
