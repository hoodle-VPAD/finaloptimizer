
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { Footer } from './components/Footer';
import { generateRealEstateContent } from './services/geminiService';
import type { InputData } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGenerateContent = useCallback(async (input: InputData) => {
    setIsLoading(true);
    setError('');
    setGeneratedContent('');
    try {
      await generateRealEstateContent(input, (chunk) => {
        setGeneratedContent((prev) => prev + chunk);
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. Please try again. (${errorMessage})`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <InputForm onGenerate={handleGenerateContent} isLoading={isLoading} />
            <OutputDisplay 
              isLoading={isLoading} 
              content={generatedContent} 
              error={error} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
