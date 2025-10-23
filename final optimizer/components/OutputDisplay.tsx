import React from 'react';
import { Spinner } from './Spinner';

interface OutputDisplayProps {
  isLoading: boolean;
  content: string;
  error: string;
}

const renderMarkdownInline = (text: string) => {
    if (!text) return text;
    
    // Regex to find **bold** text and [links](url)
    const regex = /(\*\*.*?\*\*)|(\[.*?\]\(.*?\))/g;
    const parts = text.split(regex).filter(part => part);

    return parts.map((part, index) => {
        // Handle bold text
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-slate-700">{part.slice(2, -2)}</strong>;
        }
        // Handle links
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const linkTextMatch = part.match(/\[(.*?)\]/);
            const urlMatch = part.match(/\((.*?)\)/);
            if (linkTextMatch && urlMatch) {
                const linkText = linkTextMatch[1];
                const url = urlMatch[1];
                return <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium underline">{linkText}</a>;
            }
        }
        return part;
    });
};

const BlinkingCursor = () => (
    <span className="inline-block w-2 h-5 bg-indigo-600 animate-pulse ml-1" aria-hidden="true"></span>
);

const renderMarkdown = (text: string) => {
    if (!text) return null;

    const elements: React.ReactElement[] = [];
    const lines = text.split('\n');
    let paragraphBuffer: string[] = [];

    const flushParagraphBuffer = () => {
        if (paragraphBuffer.length > 0) {
            const paragraphContent = renderMarkdownInline(paragraphBuffer.join('\n'));
            elements.push(
              <p key={elements.length} className="mb-4 text-slate-600 leading-relaxed">
                {paragraphContent}
              </p>
            );
            paragraphBuffer = [];
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('# ')) {
            flushParagraphBuffer();
            elements.push(<h1 key={elements.length} className="text-3xl font-bold mt-4 mb-4 text-slate-900">{line.substring(2)}</h1>);
        } else if (line.startsWith('### ')) {
            flushParagraphBuffer();
            elements.push(<h3 key={elements.length} className="text-xl font-semibold mt-6 mb-2 text-slate-800">{line.substring(4)}</h3>);
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
            flushParagraphBuffer();
            const listItems = [];
            while (i < lines.length && (lines[i].startsWith('* ') || lines[i].startsWith('- '))) {
                listItems.push(lines[i].substring(lines[i].indexOf(' ') + 1));
                i++;
            }
            i--; 
            elements.push(
                <ul key={elements.length} className="list-disc list-inside space-y-2 mb-4 pl-2 text-slate-600">
                    {listItems.map((item, itemIndex) => <li key={itemIndex}>{renderMarkdownInline(item)}</li>)}
                </ul>
            );
        } else if (line.trim() === '') {
            flushParagraphBuffer();
        } else {
            paragraphBuffer.push(line);
        }
    }

    flushParagraphBuffer(); 

    return elements;
};


// FIX: Correctly type the component props using React.FC<OutputDisplayProps> to resolve type errors.
export const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, content, error }) => {
  return (
    <div className="bg-slate-50 rounded-lg p-6 h-[70vh] lg:h-auto overflow-y-auto ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Generated Page Content</h2>
      <div className="prose prose-slate max-w-none">
        {isLoading && !content && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Spinner />
            <p className="text-slate-500">Generating content... this may take a moment.</p>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-bold">An error occurred:</p>
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && !content && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Your generated content will appear here once you submit the form.</p>
            </div>
        )}
        {content && <div>{renderMarkdown(content)}{isLoading && <BlinkingCursor />}</div>}
      </div>
    </div>
  );
};
