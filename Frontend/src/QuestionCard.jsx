// src/QuestionCard.js
import React from 'react';

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrev,
  onSkip,
  currentAnswer,
}) => {

  // Renders the correct input type based on the question data
  const renderInput = () => {
    if (question.type === 'rating') {
      const buttons = [];
      for (let i = 1; i <= question.options.maxRating; i++) {
        const isSelected = currentAnswer === i;
        buttons.push(
          <button
            key={i}
            className={`w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center
                        ${isSelected
                          ? 'bg-green-500 text-white scale-110'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
            onClick={() => onAnswer(question.id, i)}
          >
            {i}
          </button>
        );
      }
      return <div className="flex flex-wrap justify-center gap-3">{buttons}</div>;
    }

    if (question.type === 'text') {
      return (
        <textarea
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Type your answer here..."
          value={currentAnswer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
      < div className="text-right text-sm font-semibold text-gray-500 mb-4">
        Question {questionNumber} / {totalQuestions}
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-left">{question.text}</h3>
      <div className="my-8">{renderInput()}</div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          disabled={questionNumber === 1}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onSkip}
          className="text-sm text-gray-500 hover:text-gray-800 font-semibold"
        >
          Skip
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          {questionNumber === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;