import React, { useState } from 'react';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
import './Quiz.css';

const Quiz: React.FC = () => {
  const [quizCore] = useState<QuizCore>(() => new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    () => quizCore.getCurrentQuestion()
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    () => quizCore.getCurrentAnswer()
  );
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handlePrevClick = (): void => {
    if (!quizCore.hasPrevQuestion()) return;
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
    }
    quizCore.prevQuestion();
    setCurrentQuestion(quizCore.getCurrentQuestion());
    setSelectedAnswer(quizCore.getCurrentAnswer());
  };

  const handleNextClick = (): void => {
    if (selectedAnswer === null || !currentQuestion) return;

    quizCore.answerQuestion(selectedAnswer);
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(quizCore.getCurrentAnswer());
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (isQuizCompleted || !currentQuestion) {
    const score = quizCore.getScore();
    const total = quizCore.getTotalQuestions();
    const questions = quizCore.getQuestions();
    const answers = quizCore.getUserAnswers();

    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {total}</p>

        <h3>Review Your Answers:</h3>
        <ul className="summary-list">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const correct = q.correctAnswer === userAnswer;
            return (
              <li key={idx} className={correct ? 'correct' : 'incorrect'}>
                <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                <p>Your answer: {userAnswer ?? <em>None</em>}</p>
                <p>Correct answer: {q.correctAnswer}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const nextLabel = quizCore.hasNextQuestion() ? 'Next' : 'Submit';

  return (
    <div className="quiz-container">
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

      <div className="button-group">
        {quizCore.hasPrevQuestion() && (
          <button onClick={handlePrevClick}>
            Previous
          </button>
        )}
        <button onClick={handleNextClick} disabled={!selectedAnswer}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
