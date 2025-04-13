import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [selectedOptions, setSelectedOptions] = useState(["", "", "", ""]);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
  
    
    useEffect(() => {
      axios.get('https://sentence-constructor-backend.onrender.com/questions')
        .then(res => setQuestions(res.data))
        .catch(err => alert(err));
    }, []);
  
    useEffect(() => {
      if (questions.length === 0 || showResult) return;
  
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            handleNext();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [currentQ, questions, showResult]);
  
    const handleOptionClick = (word) => {
        const newSelection = [...selectedOptions];
        const firstEmptyIndex = newSelection.findIndex(val => !val);
      
        if (firstEmptyIndex !== -1 && !newSelection.includes(word)) {
          newSelection[firstEmptyIndex] = word;
          setSelectedOptions(newSelection);
        }
   
    };
  
    const handleVacantClick = (index) => {
        const newSelection = [...selectedOptions];
  newSelection[index] = '';
  setSelectedOptions(newSelection);
    };
  
    const handleNext = () => {
      const currentQuestion = questions[currentQ];
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.questionId,
          selected: selectedOptions
        }
      ]);
  
      setSelectedOptions(["", "", "", ""]);
      if (currentQ + 1 >= questions.length) {
        setShowResult(true);
      } else {
        setCurrentQ(currentQ + 1);
        setTimeLeft(30);
      }
    };
  
    const getScore = () => {
      return answers.reduce((score, ans, idx) => {
        const correct = questions[idx].correctAnswer;
        if (JSON.stringify(ans.selected) === JSON.stringify(correct)) {
          return score + 1;
        }
        return score;
      }, 0);
    };
  
    if (questions.length === 0) return <div className="text-center mt-10">Loading questions...</div>;
  
    if (showResult) {
      return (
 

        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
  <div className="bg-white p-6 md:p-10 rounded-xl shadow-md w-full max-w-xl text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-4">
      Your Score: {getScore()} / {questions.length}
    </h2>
    <p className="text-gray-600 text-base sm:text-lg">Well done! 🎉</p>
  </div>
</div>

      );
    }
  
    const currentQuestion = questions[currentQ];
  
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex justify-between mb-4 text-xl font-semibold">
          <div>Question {currentQ + 1} / {questions.length}</div>
          <div>⏱️ {timeLeft}s</div>
        </div>
  


  






<div className="mb-4 text-lg">
  <p className="mb-2">
    {currentQuestion.question
      .trim()
      .split(/_+/)
      .map((part, index, arr) => (
        <React.Fragment key={index}>
          {part.trim()}
          {index < arr.length - 1 && (
            <span
              onClick={() => handleVacantClick(index)}
              className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded m-1 cursor-pointer border border-blue-400 min-w-[80px] text-center"
            >
              {selectedOptions[index] || '_____'}
            </span>
          )}
        </React.Fragment>
      ))}
  </p>
</div>






  
        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              disabled={selectedOptions.includes(opt)}
              className={`px-4 py-2 border rounded ${selectedOptions.includes(opt) ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
            >
              {opt}
            </button>
          ))}
        </div>
  
        <button
          onClick={handleNext}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Next
        </button>
      </div>
    );
}
