import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { surveyQuestions } from './questions';
import QuestionCard from './QuestionCard';

//Welcome Screen
const WelcomeScreen = ({ onStart }) => (
  <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg max-w-lg w-full text-center">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Our Shop!</h1>
    <p className="text-gray-600 mb-6">Your feedback helps us improve. Please take a moment for our survey.</p>
    <button
      onClick={onStart}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 text-lg"
    >
      Start Survey
    </button>
  </div>
);

//Thankyou Screen
const ThankYouScreen = ({ onRestart }) => (
  <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg max-w-lg w-full text-center">
    <h1 className="text-3xl font-bold mb-4 text-green-600">Thank you!</h1>
    <p className="text-gray-600 mb-6">We appreciate your valuable feedback.</p>
    <button
      onClick={onRestart}
      className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition"
    >
      Start New Survey
    </button>
  </div>
);

function App() {
  const [surveyState, setSurveyState] = useState('welcome');
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStartSurvey = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSurveyState('active');
  };

  const handleRestartSurvey = handleStartSurvey;

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishSurvey = async () => {
    try {
      await axios.post('http://localhost:4000/api/surveys', {
        sessionId: sessionId,
        answers: answers,
      });
      setSurveyState('complete');
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Sorry, we couldn't submit your survey. Please try again later.");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishSurvey();
    }
  };

  const handleSkip = () => {
    handleAnswer(surveyQuestions[currentQuestionIndex].id, 'skipped');
    handleNext();
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center font-sans p-4">
      {surveyState === 'welcome' && <WelcomeScreen onStart={handleStartSurvey} />}
      {surveyState === 'complete' && <ThankYouScreen onRestart={handleRestartSurvey} />}
      {surveyState === 'active' && (
        <QuestionCard
          question={surveyQuestions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={surveyQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onSkip={handleSkip}
          currentAnswer={answers[surveyQuestions[currentQuestionIndex].id]}
        />
      )}
    </div>
  );
}

export default App;