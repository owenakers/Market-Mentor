// frontend/src/pages/LearningPathPage.tsx

import { useState } from 'react';
import { learningPath, termDefinitions } from '../learningContent';
import { Link } from 'react-router-dom';

export function LearningPathPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = learningPath.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTermClick = (term: string) => {
    // Look up the definition and show it in a simple alert
    const definition = termDefinitions[term];
    if (definition) {
      alert(`${term}:\n\n${definition}`);
    }
  };

  // Function to find and wrap key terms in the content
  const renderContentWithTerms = (text: string) => {
    const terms = Object.keys(termDefinitions);
    // Create a regex to find any of the terms
    const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'g');
    
    // Split the text by the terms and wrap the terms in a clickable span
    return text.split(regex).map((part, index) => {
      if (terms.includes(part)) {
        return <strong key={index} className="text-indigo-600 cursor-pointer hover:underline" onClick={() => handleTermClick(part)}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center mb-6">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">Step {currentStep + 1} of {totalSteps}</p>
          <div className="bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
          </div>
        </div>
        
        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{learningPath[currentStep].title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {renderContentWithTerms(learningPath[currentStep].content)}
        </p>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentStep === totalSteps - 1}
            className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}