
import React, { useState } from 'react';
import type { InputData } from '../types';
import { Spinner } from './Spinner';

interface InputFormProps {
  onGenerate: (data: InputData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [inputType, setInputType] = useState<'source' | 'details'>('details');
  const [sourceText, setSourceText] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ inputType, sourceText, communityName, city, state });
  };

  const isDetailsSubmitDisabled = inputType === 'details' && (!communityName || !city || !state);
  const isSourceSubmitDisabled = inputType === 'source' && !sourceText;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Provide Community Info</h2>
        <p className="text-slate-500">Choose an input method and provide the details below.</p>
      </div>

      <div className="flex items-center justify-center bg-slate-100 rounded-lg p-1.5">
        <button
          onClick={() => setInputType('details')}
          className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 ${inputType === 'details' ? 'bg-white text-indigo-600 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          Community Details
        </button>
        <button
          onClick={() => setInputType('source')}
          className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 ${inputType === 'source' ? 'bg-white text-indigo-600 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          Full Source Text
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputType === 'details' ? (
          <>
            <div>
              <label htmlFor="communityName" className="block text-sm font-medium text-slate-700 mb-1">Community Name</label>
              <input
                type="text"
                id="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g., Willow Creek Estates"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Pleasantville"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g., California"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="sourceText" className="block text-sm font-medium text-slate-700 mb-1">Source Text</label>
            <textarea
              id="sourceText"
              rows={8}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste all your community details here..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || isDetailsSubmitDisabled || isSourceSubmitDisabled}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Spinner /> : 'Generate Content'}
        </button>
      </form>
    </div>
  );
};
