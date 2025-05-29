import React, { useState, useEffect } from 'react';

const QuizExamPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const colors = {
    primary: "#2c3e50",
    secondary: "#34495e", 
    accent: "#1a5276",
    success: "#27ae60",
    warning: "#f39c12",
    danger: "#e74c3c",
    light: "#ecf0f1",
    text: "#2c3e50"
  };

  // Sample quiz data
  const quizzes = [
    {
      id: 1,
      title: "Mathematics - Algebra Basics",
      subject: "Mathematics",
      duration: 30,
      totalQuestions: 10,
      difficulty: "Medium",
      dueDate: "2025-06-05",
      status: "available",
      questions: [
        {
          question: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["5", "10", "7", "3"],
          correct: 0
        },
        {
          question: "Simplify: 3x + 2x - x",
          options: ["4x", "5x", "6x", "2x"],
          correct: 0
        },
        {
          question: "What is 2³?",
          options: ["6", "8", "9", "4"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "English Literature - Shakespeare",
      subject: "English",
      duration: 45,
      totalQuestions: 15,
      difficulty: "Hard",
      dueDate: "2025-06-10",
      status: "available",
      questions: [
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
          correct: 1
        },
        {
          question: "In which city is 'Romeo and Juliet' set?",
          options: ["Venice", "Rome", "Verona", "Florence"],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Physics - Motion and Forces",
      subject: "Physics",
      duration: 60,
      totalQuestions: 20,
      difficulty: "Hard",
      dueDate: "2025-05-25",
      status: "completed",
      score: 85,
      questions: []
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && selectedQuiz) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(quiz.duration * 60);
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    selectedQuiz.questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(null);
    setShowResults(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return colors.danger;
      default: return colors.secondary;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return colors.success;
      case 'completed': return colors.secondary;
      case 'overdue': return colors.danger;
      default: return colors.secondary;
    }
  };

  if (showResults) {
    return (
      <div style={{ marginLeft: '70px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            padding: '40px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', color: score >= 70 ? colors.success : colors.danger, marginBottom: '20px' }}>
              {score >= 70 ? '🎉' : '📚'}
            </div>
            <h2 style={{ color: colors.text, marginBottom: '10px' }}>Quiz Completed!</h2>
            <h3 style={{ color: colors.secondary, marginBottom: '30px' }}>{selectedQuiz.title}</h3>
            
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: score >= 70 ? colors.success : colors.danger,
              marginBottom: '20px'
            }}>
              {score}%
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>
                  {Object.values(answers).filter((ans, i) => ans === selectedQuiz.questions[i]?.correct).length}
                </div>
                <div style={{ color: colors.secondary }}>Correct</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>
                  {selectedQuiz.questions.length - Object.values(answers).filter((ans, i) => ans === selectedQuiz.questions[i]?.correct).length}
                </div>
                <div style={{ color: colors.secondary }}>Incorrect</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>
                  {selectedQuiz.questions.length}
                </div>
                <div style={{ color: colors.secondary }}>Total</div>
              </div>
            </div>

            <div style={{ 
              padding: '20px', 
              backgroundColor: score >= 70 ? '#d4edda' : '#f8d7da', 
              borderRadius: '10px', 
              marginBottom: '30px',
              color: score >= 70 ? '#155724' : '#721c24'
            }}>
              {score >= 70 ? 
                'Congratulations! You passed the quiz with flying colors!' : 
                'Keep studying! You can retake this quiz to improve your score.'
              }
            </div>

            <button
              onClick={resetQuiz}
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz && !showResults) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div style={{ marginLeft: '70px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Quiz Header */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            padding: '20px', 
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: colors.text, margin: 0 }}>{selectedQuiz.title}</h3>
                <p style={{ color: colors.secondary, margin: '5px 0 0 0' }}>
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: timeLeft < 300 ? colors.danger : colors.text 
                }}>
                  {formatTime(timeLeft)}
                </div>
                <p style={{ color: colors.secondary, margin: 0 }}>Time Remaining</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '4px', 
              marginTop: '15px' 
            }}>
              <div style={{ 
                width: `${progress}%`, 
                height: '100%', 
                backgroundColor: colors.primary, 
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          {/* Question Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: colors.text, marginBottom: '25px', lineHeight: '1.6' }}>
              {question.question}
            </h4>

            <div style={{ display: 'grid', gap: '15px' }}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  style={{
                    padding: '15px 20px',
                    border: `2px solid ${answers[currentQuestion] === index ? colors.primary : '#e9ecef'}`,
                    borderRadius: '10px',
                    backgroundColor: answers[currentQuestion] === index ? `${colors.primary}20` : 'white',
                    color: colors.text,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (answers[currentQuestion] !== index) {
                      e.target.style.backgroundColor = '#f8f9fa';
                      e.target.style.borderColor = colors.secondary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[currentQuestion] !== index) {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = '#e9ecef';
                    }
                  }}
                >
                  <span style={{ 
                    display: 'inline-block', 
                    width: '25px', 
                    height: '25px', 
                    borderRadius: '50%', 
                    backgroundColor: answers[currentQuestion] === index ? colors.primary : '#e9ecef',
                    color: answers[currentQuestion] === index ? 'white' : colors.secondary,
                    textAlign: 'center',
                    lineHeight: '25px',
                    marginRight: '15px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              style={{
                backgroundColor: currentQuestion === 0 ? '#e9ecef' : 'white',
                color: currentQuestion === 0 ? '#6c757d' : colors.text,
                border: `1px solid ${currentQuestion === 0 ? '#e9ecef' : colors.secondary}`,
                padding: '12px 25px',
                borderRadius: '25px',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (currentQuestion !== 0) {
                  e.target.style.backgroundColor = colors.light;
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion !== 0) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedQuiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentQuestion ? colors.primary : 
                                   answers[index] !== undefined ? colors.success : '#e9ecef',
                    color: index === currentQuestion || answers[index] !== undefined ? 'white' : colors.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === selectedQuiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                style={{
                  backgroundColor: colors.success,
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#219653'}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.success}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: '70px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: colors.text, marginBottom: '10px' }}>Quiz & Examinations</h1>
          <p style={{ color: colors.secondary, fontSize: '1.1rem' }}>
            Test your knowledge and track your academic progress
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          {['available', 'completed', 'upcoming'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 25px',
                border: 'none',
                borderRadius: '25px',
                backgroundColor: activeTab === tab ? colors.primary : 'white',
                color: activeTab === tab ? 'white' : colors.text,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                fontWeight: activeTab === tab ? 'bold' : 'normal'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.target.style.backgroundColor = colors.light;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              {tab} Quizzes
            </button>
          ))}
        </div>

        {/* Quiz Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {quizzes
            .filter(quiz => {
              if (activeTab === 'available') return quiz.status === 'available';
              if (activeTab === 'completed') return quiz.status === 'completed';
              return quiz.status === 'upcoming';
            })
            .map(quiz => (
              <div
                key={quiz.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ color: colors.text, margin: '0 0 5px 0' }}>{quiz.title}</h3>
                    <p style={{ color: colors.secondary, margin: 0, fontSize: '0.9rem' }}>{quiz.subject}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: `${getDifficultyColor(quiz.difficulty)}20`,
                    color: getDifficultyColor(quiz.difficulty)
                  }}>
                    {quiz.difficulty}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bi bi-clock" style={{ color: colors.secondary }}></i>
                    <span style={{ color: colors.text, fontSize: '0.9rem' }}>{quiz.duration} min</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bi bi-question-circle" style={{ color: colors.secondary }}></i>
                    <span style={{ color: colors.text, fontSize: '0.9rem' }}>{quiz.totalQuestions} questions</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <i className="bi bi-calendar" style={{ color: colors.secondary }}></i>
                  <span style={{ color: colors.text, fontSize: '0.9rem' }}>Due: {quiz.dueDate}</span>
                </div>

                {quiz.status === 'completed' && (
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: `${colors.success}20`, 
                    borderRadius: '8px', 
                    marginBottom: '15px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: colors.success, fontWeight: 'bold' }}>Completed</span>
                      <span style={{ color: colors.success, fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {quiz.score}%
                      </span>
                    </div>
                  </div>
                )}

                {quiz.status === 'available' && (
                  <button
                    onClick={() => startQuiz(quiz)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    Start Quiz
                  </button>
                )}
              </div>
            ))}
        </div>

        {/* Empty State */}
        {quizzes.filter(quiz => {
          if (activeTab === 'available') return quiz.status === 'available';
          if (activeTab === 'completed') return quiz.status === 'completed';
          return quiz.status === 'upcoming';
        }).length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
            <h3 style={{ color: colors.text, marginBottom: '10px' }}>No {activeTab} quizzes</h3>
            <p style={{ color: colors.secondary }}>
              {activeTab === 'available' && "All caught up! Check back later for new quizzes."}
              {activeTab === 'completed' && "You haven't completed any quizzes yet."}
              {activeTab === 'upcoming' && "No upcoming quizzes scheduled."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizExamPage;