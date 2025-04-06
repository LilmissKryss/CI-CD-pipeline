import { useState } from "react";
import type { Question } from "../models/Question.js";
import { getQuestions } from "../services/questionApi.js";

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Quiz: Fetching questions...");
      const questions = await getQuestions();

      if (!questions || questions.length === 0) {
        throw new Error("No questions returned from the server");
      }

      console.log("Quiz: Setting questions:", questions);
      setQuestions(questions);
    } catch (err) {
      console.error("Quiz: Error fetching questions:", err);
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    await getRandomQuestions();
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Take New Quiz
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger p-4 text-center">
        <h4>Error</h4>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={handleStartQuiz}>
          Try Again
        </button>
      </div>
    );
  }

  if (quizStarted && questions.length === 0) {
    return (
      <div className="alert alert-warning p-4 text-center">
        <h4>No Questions Available</h4>
        <p>There are no questions available at this time.</p>
        <button className="btn btn-primary" onClick={handleStartQuiz}>
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="card p-4">
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              className="btn btn-primary"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">
              {answer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
