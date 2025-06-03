import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Clock, Award, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';

const SchoolExamSystem = () => {
  const [userRole, setUserRole] = useState('student'); // 'student' or 'teacher'
  const [activeTab, setActiveTab] = useState('available');
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [studentResults, setStudentResults] = useState([]);

  const colors = {
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    light: "#f1f5f9",
    dark: "#1e293b",
    text: "#1f2937"
  };

  // Mock data for demonstration
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Mathematics - Quadratic Equations",
      subject: "Mathematics",
      class: "SS2",
      duration: 60,
      totalQuestions: 20,
      totalMarks: 100,
      passingScore: 50,
      dueDate: "2025-06-15",
      status: "available",
      createdBy: "Mr. Johnson",
      instructions: "Answer all questions. Show your workings where necessary.",
      questions: [
        {
          id: 1,
          question: "Solve for x: x² - 5x + 6 = 0",
          options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 2, -3"],
          correct: 0,
          marks: 5
        },
        {
          id: 2,
          question: "What is the discriminant of 2x² + 3x - 1 = 0?",
          options: ["17", "25", "9", "1"],
          correct: 0,
          marks: 5
        },
        {
          id: 3,
          question: "Find the roots of x² - 4x + 4 = 0",
          options: ["x = 2 (double root)", "x = 4, 0", "x = 2, -2", "x = 1, 4"],
          correct: 0,
          marks: 5
        }
      ]
    },
    {
      id: 2,
      title: "English Language - Comprehension",
      subject: "English Language",
      class: "SS1",
      duration: 90,
      totalQuestions: 30,
      totalMarks: 150,
      passingScore: 75,
      dueDate: "2025-06-20",
      status: "available",
      createdBy: "Mrs. Adebayo",
      instructions: "Read the passage carefully and answer all questions.",
      questions: [
        {
          id: 1,
          question: "What is the main theme of the passage?",
          options: ["Love", "Friendship", "Courage", "Education"],
          correct: 3,
          marks: 5
        }
      ]
    },
    {
      id: 3,
      title: "Physics - Wave Motion",
      subject: "Physics",
      class: "SS3",
      duration: 120,
      totalQuestions: 25,
      totalMarks: 125,
      passingScore: 62,
      dueDate: "2025-05-30",
      status: "completed",
      createdBy: "Dr. Okafor",
      score: 78,
      questions: []
    }
  ]);

  const [mockStudentResults] = useState([
    { id: 1, studentName: "John Doe", class: "SS2", examTitle: "Mathematics - Quadratic Equations", score: 85, grade: "A", status: "Passed" },
    { id: 2, studentName: "Jane Smith", class: "SS2", examTitle: "Mathematics - Quadratic Equations", score: 72, grade: "B", status: "Passed" },
    { id: 3, studentName: "Mike Johnson", class: "SS2", examTitle: "Mathematics - Quadratic Equations", score: 45, grade: "F", status: "Failed" }
  ]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && selectedExam) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitExam();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
                     : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startExam = (exam) => {
    setSelectedExam(exam);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(exam.duration * 60);
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedExam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = () => {
    let totalMarks = 0;
    let earnedMarks = 0;
    
    selectedExam.questions.forEach((q, index) => {
      totalMarks += q.marks;
      if (answers[index] === q.correct) {
        earnedMarks += q.marks;
      }
    });
    
    const finalScore = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
    setScore(finalScore);
    setShowResults(true);
    
    // Update exam status to completed
    setExams(prev => prev.map(exam => 
      exam.id === selectedExam.id 
        ? { ...exam, status: 'completed', score: finalScore }
        : exam
    ));
  };

  const resetExam = () => {
    setSelectedExam(null);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(null);
    setShowResults(false);
    setScore(0);
  };

  const getGrade = (score) => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return colors.success;
      case 'completed': return colors.primary;
      case 'overdue': return colors.danger;
      default: return colors.secondary;
    }
  };

  const handleCreateExam = () => {
    setShowCreateExam(true);
    setEditingExam({
      title: '',
      subject: '',
      class: '',
      duration: 60,
      totalMarks: 100,
      passingScore: 50,
      dueDate: '',
      instructions: '',
      questions: []
    });
  };

  const handleSaveExam = () => {
    if (editingExam.id) {
      setExams(prev => prev.map(exam => 
        exam.id === editingExam.id ? editingExam : exam
      ));
    } else {
      const newExam = {
        ...editingExam,
        id: Date.now(),
        status: 'available',
        createdBy: 'Current Teacher',
        totalQuestions: editingExam.questions.length
      };
      setExams(prev => [...prev, newExam]);
    }
    setShowCreateExam(false);
    setEditingExam(null);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      marks: 5
    };
    setEditingExam(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (index, field, value) => {
    setEditingExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const deleteQuestion = (index) => {
    setEditingExam(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  // Role Toggle (for demo purposes)
  const RoleToggle = () => (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: 1000,
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <label style={{ marginRight: '10px', color: colors.text }}>Role:</label>
      <select 
        value={userRole} 
        onChange={(e) => {
          setUserRole(e.target.value);
          setActiveTab(e.target.value === 'teacher' ? 'manage' : 'available');
          resetExam();
        }}
        style={{ 
          padding: '5px 10px', 
          borderRadius: '4px', 
          border: '1px solid #ccc' 
        }}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>
  );

  // Results Display
  if (showResults && userRole === 'student') {
    const grade = getGrade(score);
    const passed = score >= selectedExam.passingScore;
    
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <RoleToggle />
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            padding: '40px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', color: passed ? colors.success : colors.danger, marginBottom: '20px' }}>
              {passed ? '🎉' : '📚'}
            </div>
            <h2 style={{ color: colors.text, marginBottom: '10px' }}>Examination Completed!</h2>
            <h3 style={{ color: colors.secondary, marginBottom: '30px' }}>{selectedExam.title}</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '20px', 
              marginBottom: '30px' 
            }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: colors.light, 
                borderRadius: '10px' 
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.text }}>
                  {score}%
                </div>
                <div style={{ color: colors.secondary }}>Your Score</div>
              </div>
              <div style={{ 
                padding: '20px', 
                backgroundColor: colors.light, 
                borderRadius: '10px' 
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.text }}>
                  {grade}
                </div>
                <div style={{ color: colors.secondary }}>Grade</div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '15px', 
              marginBottom: '30px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.success }}>
                  {Object.values(answers).filter((ans, i) => ans === selectedExam.questions[i]?.correct).length}
                </div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Correct</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.danger }}>
                  {selectedExam.questions.length - Object.values(answers).filter((ans, i) => ans === selectedExam.questions[i]?.correct).length}
                </div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Incorrect</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>
                  {selectedExam.questions.length}
                </div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Total</div>
              </div>
            </div>

            <div style={{ 
              padding: '20px', 
              backgroundColor: passed ? '#d4edda' : '#f8d7da', 
              borderRadius: '10px', 
              marginBottom: '30px',
              color: passed ? '#155724' : '#721c24'
            }}>
              <strong>{passed ? 'Congratulations!' : 'Keep Studying'}</strong>
              <br />
              {passed ? 
                `You have successfully passed this examination with a grade of ${grade}.` : 
                `You scored below the passing mark of ${selectedExam.passingScore}%. Please review the topics and try again.`
              }
            </div>

            <button
              onClick={resetExam}
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
            >
              Back to Examinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exam Taking Interface
  if (selectedExam && !showResults && userRole === 'student') {
    const question = selectedExam.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedExam.questions.length) * 100;

    return (
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <RoleToggle />
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Exam Header */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            padding: '20px', 
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: colors.text, margin: 0 }}>{selectedExam.title}</h3>
                <p style={{ color: colors.secondary, margin: '5px 0 0 0' }}>
                  Question {currentQuestion + 1} of {selectedExam.questions.length} • {selectedExam.class}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: timeLeft < 600 ? colors.danger : colors.text 
                }}>
                  <Clock size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  {formatTime(timeLeft)}
                </div>
                <p style={{ color: colors.secondary, margin: 0, fontSize: '0.9rem' }}>Time Remaining</p>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: colors.text, margin: 0, flex: 1 }}>
                {question.question}
              </h4>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: colors.light, 
                borderRadius: '20px', 
                fontSize: '0.9rem',
                color: colors.text,
                fontWeight: 'bold'
              }}>
                {question.marks} marks
              </span>
            </div>

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

          {/* Navigation */}
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
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {selectedExam.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentQuestion ? colors.primary : 
                                   answers[index] !== undefined ? colors.success : '#e9ecef',
                    color: index === currentQuestion || answers[index] !== undefined ? 'white' : colors.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === selectedExam.questions.length - 1 ? (
              <button
                onClick={handleSubmitExam}
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
              >
                Submit Exam
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
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Create/Edit Exam Modal
  if (showCreateExam && userRole === 'teacher') {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: colors.text, margin: 0 }}>
              {editingExam?.id ? 'Edit Examination' : 'Create New Examination'}
            </h2>
            <button
              onClick={() => setShowCreateExam(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: colors.secondary,
                padding: '5px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Exam Title
              </label>
              <input
                type="text"
                value={editingExam?.title || ''}
                onChange={(e) => setEditingExam(prev => ({ ...prev, title: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="Enter exam title"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Subject
              </label>
              <input
                type="text"
                value={editingExam?.subject || ''}
                onChange={(e) => setEditingExam(prev => ({ ...prev, subject: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Class
              </label>
              <select
                value={editingExam?.class || ''}
                onChange={(e) => setEditingExam(prev => ({ ...prev, class: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select Class</option>
                <option value="SS1">SS1</option>
                <option value="SS2">SS2</option>
                <option value="SS3">SS3</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                value={editingExam?.duration || 60}
                onChange={(e) => setEditingExam(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Total Marks
              </label>
              <input
                type="number"
                value={editingExam?.totalMarks || 100}
                onChange={(e) => setEditingExam(prev => ({ ...prev, totalMarks: parseInt(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
                Passing Score (%)
              </label>
              <input
                type="number"
                value={editingExam?.passingScore || 50}
                onChange={(e) => setEditingExam(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
              Due Date
            </label>
            <input
              type="date"
              value={editingExam?.dueDate || ''}
              onChange={(e) => setEditingExam(prev => ({ ...prev, dueDate: e.target.value }))}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold' }}>
              Instructions
            </label>
            <textarea
              value={editingExam?.instructions || ''}
              onChange={(e) => setEditingExam(prev => ({ ...prev, instructions: e.target.value }))}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Enter exam instructions"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: colors.text, margin: 0 }}>Questions</h3>
              <button
                onClick={addQuestion}
                style={{
                  backgroundColor: colors.success,
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Plus size={16} />
                Add Question
              </button>
            </div>

            {editingExam?.questions?.map((question, qIndex) => (
              <div key={question.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '10px', 
                padding: '20px', 
                marginBottom: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ color: colors.text, margin: 0 }}>Question {qIndex + 1}</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="number"
                      value={question.marks}
                      onChange={(e) => updateQuestion(qIndex, 'marks', parseInt(e.target.value))}
                      style={{
                        width: '70px',
                        padding: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                      placeholder="Marks"
                    />
                    <button
                      onClick={() => deleteQuestion(qIndex)}
                      style={{
                        backgroundColor: colors.danger,
                        color: 'white',
                        border: 'none',
                        padding: '5px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <textarea
                  value={question.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    minHeight: '60px'
                  }}
                  placeholder="Enter question"
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '15px' }}>
                  {question.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[oIndex] = e.target.value;
                        updateQuestion(qIndex, 'options', newOptions);
                      }}
                      style={{
                        padding: '10px',
                        border: `2px solid ${question.correct === oIndex ? colors.success : '#ddd'}`,
                        borderRadius: '8px',
                        backgroundColor: question.correct === oIndex ? `${colors.success}10` : 'white'
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                    />
                  ))}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: colors.text, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Correct Answer:
                  </label>
                  <select
                    value={question.correct}
                    onChange={(e) => updateQuestion(qIndex, 'correct', parseInt(e.target.value))}
                    style={{
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  >
                    {question.options.map((_, oIndex) => (
                      <option key={oIndex} value={oIndex}>
                        Option {String.fromCharCode(65 + oIndex)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowCreateExam(false)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveExam}
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={16} />
              Save Examination
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Interface
  return (
    <div style={{ padding: '10px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <RoleToggle />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: colors.text, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={32} color={colors.primary} />
            {userRole === 'teacher' ? 'Examination Management' : 'Student Examinations'}
          </h1>
          <p style={{ color: colors.secondary, fontSize: '1.1rem' }}>
            {userRole === 'teacher' 
              ? 'Create, manage and monitor student examinations' 
              : 'Take your examinations and view your results'
            }
          </p>
        </div>

        {/* Statistics Cards (for Teachers) */}
        {userRole === 'teacher' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ padding: '12px', backgroundColor: `${colors.primary}20`, borderRadius: '10px' }}>
                <BookOpen size={24} color={colors.primary} />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colors.text }}>{exams.length}</div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Total Exams</div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ padding: '12px', backgroundColor: `${colors.success}20`, borderRadius: '10px' }}>
                <Users size={24} color={colors.success} />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colors.text }}>{mockStudentResults.length}</div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Student Results</div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ padding: '12px', backgroundColor: `${colors.warning}20`, borderRadius: '10px' }}>
                <Clock size={24} color={colors.warning} />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colors.text }}>
                  {exams.filter(e => e.status === 'available').length}
                </div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Active Exams</div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ padding: '12px', backgroundColor: `${colors.accent}20`, borderRadius: '10px' }}>
                <Award size={24} color={colors.accent} />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colors.text }}>
                  {Math.round(mockStudentResults.reduce((acc, result) => acc + result.score, 0) / mockStudentResults.length)}%
                </div>
                <div style={{ color: colors.secondary, fontSize: '0.9rem' }}>Avg. Score</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {userRole === 'student' ? (
            ['available', 'completed', 'results'].map(tab => (
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
              >
                {tab === 'results' ? 'My Results' : `${tab} Exams`}
              </button>
            ))
          ) : (
            ['manage', 'results', 'analytics'].map(tab => (
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
              >
                {tab === 'manage' ? 'Manage Exams' : tab === 'results' ? 'Student Results' : 'Analytics'}
              </button>
            ))
          )}
        </div>

        {/* Create Exam Button (for Teachers) */}
        {userRole === 'teacher' && activeTab === 'manage' && (
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleCreateExam}
              style={{
                backgroundColor: colors.success,
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold'
              }}
            >
              <Plus size={20} />
              Create New Examination
            </button>
          </div>
        )}

        {/* Content based on active tab and user role */}
        {activeTab === 'results' && userRole === 'teacher' && (
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: colors.text, marginBottom: '20px' }}>Student Results</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: colors.light }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.text, fontWeight: 'bold' }}>Student Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.text, fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.text, fontWeight: 'bold' }}>Examination</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: colors.text, fontWeight: 'bold' }}>Score</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: colors.text, fontWeight: 'bold' }}>Grade</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: colors.text, fontWeight: 'bold' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudentResults.map((result, index) => (
                    <tr key={result.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px', color: colors.text }}>{result.studentName}</td>
                      <td style={{ padding: '12px', color: colors.text }}>{result.class}</td>
                      <td style={{ padding: '12px', color: colors.text }}>{result.examTitle}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: colors.text }}>{result.score}%</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: result.grade === 'A' ? `${colors.success}20` : 
                                          result.grade === 'B' ? `${colors.primary}20` :
                                          result.grade === 'C' ? `${colors.warning}20` : `${colors.danger}20`,
                          color: result.grade === 'A' ? colors.success : 
                                 result.grade === 'B' ? colors.primary :
                                 result.grade === 'C' ? colors.warning : colors.danger
                        }}>
                          {result.grade}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: result.status === 'Passed' ? `${colors.success}20` : `${colors.danger}20`,
                          color: result.status === 'Passed' ? colors.success : colors.danger
                        }}>
                          {result.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'results' && userRole === 'student' && (
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: colors.text, marginBottom: '20px' }}>My Examination Results</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {exams.filter(exam => exam.status === 'completed').map(exam => (
                <div key={exam.id} style={{
                  padding: '20px',
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ color: colors.text, margin: '0 0 5px 0' }}>{exam.title}</h4>
                    <p style={{ color: colors.secondary, margin: '0 0 5px 0' }}>{exam.subject} • {exam.class}</p>
                    <p style={{ color: colors.secondary, margin: 0, fontSize: '0.9rem' }}>
                      {exam.totalQuestions} questions • {exam.duration} minutes
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>{exam.score}%</div>
                    <div style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      backgroundColor: getGrade(exam.score) === 'A' || getGrade(exam.score) === 'B' ? `${colors.success}20` : `${colors.danger}20`,
                      color: getGrade(exam.score) === 'A' || getGrade(exam.score) === 'B' ? colors.success : colors.danger,
                      marginTop: '5px'
                    }}>
                      Grade {getGrade(exam.score)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Cards */}
        {(activeTab === 'available' || activeTab === 'completed' || activeTab === 'manage') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {exams
              .filter(exam => {
                if (userRole === 'student') {
                  if (activeTab === 'available') return exam.status === 'available';
                  if (activeTab === 'completed') return exam.status === 'completed';
                }
                return activeTab === 'manage';
              })
              .map(exam => (
                <div
                  key={exam.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ color: colors.text, margin: '0 0 5px 0' }}>{exam.title}</h3>
                      <p style={{ color: colors.secondary, margin: '0 0 5px 0' }}>{exam.subject} • {exam.class}</p>
                      {userRole === 'teacher' && (
                        <p style={{ color: colors.secondary, margin: 0, fontSize: '0.8rem' }}>Created by: {exam.createdBy}</p>
                      )}
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: `${getStatusColor(exam.status)}20`,
                      color: getStatusColor(exam.status),
                      textTransform: 'capitalize'
                    }}>
                      {exam.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color={colors.secondary} />
                      <span style={{ color: colors.text, fontSize: '0.9rem' }}>{exam.duration} min</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={16} color={colors.secondary} />
                      <span style={{ color: colors.text, fontSize: '0.9rem' }}>{exam.totalQuestions} questions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={16} color={colors.secondary} />
                      <span style={{ color: colors.text, fontSize: '0.9rem' }}>{exam.totalMarks} marks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={16} color={colors.secondary} />
                      <span style={{ color: colors.text, fontSize: '0.9rem' }}>Pass: {exam.passingScore}%</span>
                    </div>
                  </div>

                  <div style={{ padding: '10px', backgroundColor: colors.light, borderRadius: '8px', marginBottom: '20px' }}>
                    <p style={{ color: colors.text, margin: 0, fontSize: '0.9rem' }}>
                      <strong>Due:</strong> {new Date(exam.dueDate).toLocaleDateString()}
                    </p>
                  </div>

                  {exam.status === 'completed' && userRole === 'student' && (
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: `${colors.success}20`, 
                      borderRadius: '8px', 
                      marginBottom: '15px' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: colors.success, fontWeight: 'bold' }}>Completed</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: colors.success, fontWeight: 'bold', fontSize: '1.1rem' }}>
                            {exam.score}%
                          </div>
                          <div style={{ color: colors.success, fontSize: '0.8rem' }}>
                            Grade {getGrade(exam.score)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {userRole === 'student' && exam.status === 'available' && (
                      <button
                        onClick={() => startExam(exam)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          backgroundColor: colors.primary,
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Start Examination
                      </button>
                    )}
                    
                    {userRole === 'teacher' && (
                      <>
                        <button
                          onClick={() => {
                            setEditingExam(exam);
                            setShowCreateExam(true);
                          }}
                          style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: colors.secondary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            // View exam details functionality
                            console.log('View exam:', exam.id);
                          }}
                          style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: colors.accent,
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {exams.filter(exam => {
          if (userRole === 'student') {
            if (activeTab === 'available') return exam.status === 'available';
            if (activeTab === 'completed') return exam.status === 'completed';
          }
          return activeTab === 'manage';
        }).length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
            <h3 style={{ color: colors.text, marginBottom: '10px' }}>
              {userRole === 'teacher' ? 'No examinations created yet' : `No ${activeTab} examinations`}
            </h3>
            <p style={{ color: colors.secondary }}>
              {userRole === 'teacher' 
                ? "Create your first examination to get started."
                : activeTab === 'available' 
                  ? "All caught up! Check back later for new examinations."
                  : "You haven't completed any examinations yet."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolExamSystem;