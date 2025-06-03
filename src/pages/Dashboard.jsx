import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RecentActivity from "../components/RecentActivity";
import UpcomingTask from "../components/UpcomingTask";
import TeamMembers from "../components/TeamMembers";
import StatsCards from "../../src/components/custom/dashboardComponent/StatsCards";
import ChartSection from "../../src/components/custom/dashboardComponent/ChartSection";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Get user email from localStorage (same as Header component)
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  
  // Extract name from email or use a stored userName
  const getUserName = () => {
    // First try to get stored userName
    const storedName = localStorage.getItem('userName');
    if (storedName) return storedName;
    
    // If no stored name, extract from email
    const emailPrefix = userEmail.split('@')[0];
    // Convert email prefix to a more readable name format
    return emailPrefix
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const userName = getUserName();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className="content-wrapper"
        style={{
          marginLeft: sidebarOpen ? "250px" : "70px",
          width: `calc(100% - ${sidebarOpen ? "250px" : "70px"})`,
          transition: "all 0.3s",
        }}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <main className="p-2 p-md-4" style={{ marginTop: "60px" }}>
          {/* Mobile Responsive Greeting Section */}
          <div className="greeting-section mb-3 mb-md-4 p-3 p-md-4 bg-light rounded shadow-sm">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-2 mb-md-0">
                <h2 className="h5 h4-md mb-1 text-primary">
                  {getGreeting()}, {userName}! 👋
                </h2>
                <div className="d-flex flex-column flex-sm-row text-muted mb-0">
                  <span className="me-sm-3 mb-1 mb-sm-0">
                    <i className="bi bi-calendar3 me-2"></i>
                    <span className="d-inline d-sm-none">{formatDate(currentDateTime).split(',')[0]}</span>
                    <span className="d-none d-sm-inline">{formatDate(currentDateTime)}</span>
                  </span>
                  <span>
                    <i className="bi bi-clock me-2"></i>
                    {formatTime(currentDateTime)}
                  </span>
                </div>
              </div>
              <div className="text-start text-md-end">
                <small className="text-muted d-none d-md-inline">Welcome back to your dashboard</small>
              </div>
            </div>
          </div>

          {/* Mobile Responsive Dashboard Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4 gap-2 gap-sm-0">
            <h1 className="h4 h3-md mb-2 mb-sm-0">Dashboard</h1>
            <button className="btn btn-primary btn-sm btn-md-normal w-50 w-sm-auto">
              <i className="bi bi-plus-lg me-2"></i>
              <span className="d-inline d-sm-none">Add Project</span>
              <span className="d-none d-sm-inline">New Project</span>
            </button>
          </div>

          {/* Stats Cards Component */}
          <StatsCards />

          <div className="row g-2 g-md-3">
            <div className="col-12 col-lg-8">
              <RecentActivity />
              
              {/* Chart Section Component */}
              <ChartSection />
            </div>

            <div className="col-12 col-lg-4">
              <UpcomingTask />
              <TeamMembers />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;