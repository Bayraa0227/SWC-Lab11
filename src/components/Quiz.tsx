import React, { useState } from 'react';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
import './Quiz.css';

const Quiz: React.FC = () => {
  const [quizCore] = useState<QuizCore>(() => new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    () => quizCore.getCurrentQuestion()
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer === null || !currentQuestion) return;

    quizCore.answerQuestion(selectedAnswer);

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (isQuizCompleted || !currentQuestion) {
    const score = quizCore.getScore();
    const total = quizCore.getTotalQuestions();
    return (
      <div className="quiz-container">
        {/* <h1>My React Quiz</h1> */}
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {total}</p>
      </div>
    );
  }

  const buttonLabel = quizCore.hasNextQuestion() ? 'Next Question' : 'Submit';

  return (
    <div className="quiz-container">
      {/* <h1>My React Quiz</h1> */}
      <h2>Quiz Question:</h2>
      <p className="question-text">{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul className="options-list">
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={!selectedAnswer}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default Quiz;
