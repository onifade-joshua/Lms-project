import React, { useState } from 'react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('academic');

  const reportData = {
    academic: {
      subjects: [
        { name: 'Mathematics', score: 85, grade: 'A', position: 3, teacher: 'Mr. Johnson', comments: 'Excellent progress in algebra' },
        { name: 'English Language', score: 78, grade: 'B+', position: 5, teacher: 'Mrs. Smith', comments: 'Good comprehension skills' },
        { name: 'Physics', score: 92, grade: 'A+', position: 1, teacher: 'Dr. Brown', comments: 'Outstanding performance' },
        { name: 'Chemistry', score: 76, grade: 'B', position: 8, teacher: 'Ms. Davis', comments: 'Needs improvement in organic chemistry' },
        { name: 'Biology', score: 88, grade: 'A', position: 2, teacher: 'Mr. Wilson', comments: 'Strong understanding of concepts' },
        { name: 'History', score: 82, grade: 'A-', position: 4, teacher: 'Mrs. Taylor', comments: 'Good analytical skills' }
      ],
      overall: { average: 83.5, grade: 'A-', position: 4, totalStudents: 45 }
    },
    attendance: {
      present: 85,
      absent: 5,
      late: 3,
      percentage: 94.4,
      details: [
        { date: '2024-05-20', status: 'Present' },
        { date: '2024-05-21', status: 'Absent', reason: 'Sick' },
        { date: '2024-05-22', status: 'Present' },
        { date: '2024-05-23', status: 'Late', time: '8:15 AM' }
      ]
    },
    behavior: {
      conduct: 'Excellent',
      disciplinary: [],
      awards: ['Student of the Month - April', 'Perfect Attendance - March'],
      extracurricular: ['Debate Club', 'Science Club', 'Football Team']
    }
  };

  const colors = {
    primary: "#1a5276",
    secondary: "#2c3e50",
    success: "#27ae60",
    warning: "#f39c12",
    danger: "#e74c3c",
    info: "#3498db",
    light: "#ecf0f1",
    dark: "#2c3e50"
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return colors.success;
    if (grade.includes('B')) return colors.info;
    if (grade.includes('C')) return colors.warning;
    return colors.danger;
  };

  const renderAcademicReport = () => (
    <div className="row">
      {[{
        value: `${reportData.academic.overall.average}%`,
        label: "Overall Average",
        color: colors.primary,
        badge: reportData.academic.overall.grade
      }, {
        value: reportData.academic.overall.position,
        label: "Class Position",
        color: colors.success,
        subtitle: `out of ${reportData.academic.overall.totalStudents} students`
      }, {
        value: reportData.academic.subjects.length,
        label: "Subjects",
        color: colors.info,
        subtitle: "enrolled this term"
      }].map((card, i) => (
        <div className="col-md-4 mb-4" key={i}>
          <div className="card h-100" style={{ borderLeft: `4px solid ${card.color}` }}>
            <div className="card-body text-center">
              <h3 style={{ color: card.color }}>{card.value}</h3>
              <p className="mb-1">{card.label}</p>
              {card.badge && (
                <span className="badge" style={{ backgroundColor: getGradeColor(card.badge), color: 'white' }}>
                  Grade {card.badge}
                </span>
              )}
              {card.subtitle && (
                <small className="text-muted">{card.subtitle}</small>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Subject Performance Table */}
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Subject Performance</h5>
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-download me-1"></i>Download Report
            </button>
          </div>
          <div className="card-body" style={{ overflowX: 'auto' }}>
            <table className="table table-hover w-100">
              <thead style={{ backgroundColor: colors.light }}>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Position</th>
                  <th>Teacher</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {reportData.academic.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{subject.name}</td>
                    <td>{subject.score}%</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: getGradeColor(subject.grade), color: 'white' }}>
                        {subject.grade}
                      </span>
                    </td>
                    <td>{subject.position}</td>
                    <td>{subject.teacher}</td>
                    <td><small>{subject.comments}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendanceReport = () => (
    <div className="row">
      {[{
        value: `${reportData.attendance.percentage}%`,
        label: "Attendance Rate",
        color: colors.success
      }, {
        value: reportData.attendance.present,
        label: "Days Present",
        color: colors.primary
      }, {
        value: reportData.attendance.absent,
        label: "Days Absent",
        color: colors.danger
      }].map((card, i) => (
        <div className="col-md-4 mb-4" key={i}>
          <div className="card h-100" style={{ borderLeft: `4px solid ${card.color}` }}>
            <div className="card-body text-center">
              <h3 style={{ color: card.color }}>{card.value}</h3>
              <p className="mb-0">{card.label}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Attendance Details Table */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Attendance Details</h5>
          </div>
          <div className="card-body" style={{ overflowX: 'auto' }}>
            <table className="table table-striped w-100">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Reason / Time</th>
                </tr>
              </thead>
              <tbody>
                {reportData.attendance.details.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                    <td>{record.reason || record.time || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBehaviorReport = () => (
    <div className="row">
      {[{
        title: "Conduct",
        content: reportData.behavior.conduct,
        color: colors.primary
      }, {
        title: "Awards & Recognition",
        content: reportData.behavior.awards.join(', '),
        color: colors.success
      }, {
        title: "Extracurricular Activities",
        content: reportData.behavior.extracurricular.join(', '),
        color: colors.info
      }].map((item, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card h-100" style={{ borderLeft: `4px solid ${item.color}` }}>
            <div className="card-body">
              <h5 style={{ color: item.color }}>{item.title}</h5>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}

      {reportData.behavior.disciplinary.length > 0 && (
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Disciplinary Records</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {reportData.behavior.disciplinary.map((item, index) => (
                  <li key={index} className="list-group-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-fluid px-4" style={{ overflowX: 'hidden' }}>
      <h3 className="my-4">Student Report</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {['academic', 'attendance', 'behavior'].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'academic' && renderAcademicReport()}
        {activeTab === 'attendance' && renderAttendanceReport()}
        {activeTab === 'behavior' && renderBehaviorReport()}
      </div>
    </div>
  );
};

export default ReportsPage;
