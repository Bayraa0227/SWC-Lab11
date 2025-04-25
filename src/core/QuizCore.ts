import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

/**
 * The `QuizCore` class represents the core logic for managing a quiz, including
 * maintaining the quiz questions, tracking the user's answers, and calculating
 * their score.
 */
class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private userAnswers: (string | null)[];

  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    // Initialize answers array to match questions length
    this.userAnswers = Array(this.questions.length).fill(null);
  }

  /**
   * Returns the current quiz question, or null if index is out of range.
   */
  public getCurrentQuestion(): QuizQuestion | null {
    return (
      this.questions[this.currentQuestionIndex] || null
    );
  }

  /**
   * Records an answer for the current question (correct or not).
   */
  public answerQuestion(answer: string): void {
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  /**
   * Retrieves the user's previously recorded answer for the current question.
   */
  public getCurrentAnswer(): string | null {
    return this.userAnswers[this.currentQuestionIndex];
  }

  /**
   * Advances to the next question if available.
   */
  public nextQuestion(): void {
    if (this.hasNextQuestion()) {
      this.currentQuestionIndex++;
    }
  }

  /**
   * Moves to the previous question if available.
   */
  public prevQuestion(): void {
    if (this.hasPrevQuestion()) {
      this.currentQuestionIndex--;
    }
  }

  /**
   * Checks if there is another question after the current one.
   */
  public hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  /**
   * Checks if there is a question before the current one.
   */
  public hasPrevQuestion(): boolean {
    return this.currentQuestionIndex > 0;
  }

  /**
   * Calculates the total score: 1 point per correct answer.
   */
  public getScore(): number {
    return this.userAnswers.reduce((sum, ans, idx) => (
      sum + (ans === this.questions[idx].correctAnswer ? 1 : 0)
    ), 0);
  }

  /**
   * Returns the total number of questions in the quiz.
   */
  public getTotalQuestions(): number {
    return this.questions.length;
  }

  /**
   * Get all quiz questions.
   */
  public getQuestions(): QuizQuestion[] {
    return this.questions;
  }

  /**
   * Get all answers the user has given (in order), including null for unanswered.
   */
  public getUserAnswers(): (string | null)[] {
    return this.userAnswers;
  }

}

export default QuizCore;
