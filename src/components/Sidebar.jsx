import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/cu-logo.jpg";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid-1x2", path: "/dashboard" },
    { name: "Profile", icon: "bi-person", path: "/profile" },
    { name: "Calendar", icon: "bi-calendar-week", path: "/calendar" },
    { name: "Messages", icon: "bi-chat-left-text", path: "/messages" },
    { name: "Tasks", icon: "bi-check2-square", path: "/tasks" },
    { name: "Reports", icon: "bi-graph-up", path: "/reports" },
    { name: "Quiz & Exam", icon: "bi-gear", path: "/quiz" },
    { name: "Logout", icon: "bi-box-arrow-right", path: "/logout" },
  ];

  const colors = {
    background: "#2c3e50",
    hover: "#34495e",
    active: "#1a5276",
    text: "#ecf0f1",
    border: "#597081",
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div
        className="sidebar"
        style={{
          width: isOpen ? "250px" : "70px",
          transition: "all 0.3s",
          height: "100vh",
          position: "fixed",
          overflowY: "auto",
          backgroundColor: colors.background,
          color: colors.text,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center justify-content-between p-3"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            {isOpen && <span className="ms-2 fw-bold">Lms Dashboard</span>}
          </div>
          <button
            className="btn btn-link p-0"
            onClick={toggleSidebar}
            style={{ color: colors.text }}
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <i
              className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
            ></i>
          </button>
        </div>

        {/* Menu Items */}
        <ul className="nav flex-column mt-3">
          {menuItems.map((item, index) => (
            <li className="nav-item" key={index}>
              {item.name === "Logout" ? (
                <button
                  title={!isOpen ? item.name : undefined}
                  onClick={handleLogoutClick}
                  className="nav-link btn text-start w-100 py-3"
                  style={{
                    borderRadius: "0",
                    display: "flex",
                    alignItems: "center",
                    background:
                      location.pathname === item.path ? colors.active : "none",
                    border: "none",
                    color: colors.text,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      location.pathname === item.path ? colors.active : "transparent")
                  }
                >
                  <i
                    className={`bi ${item.icon} ${isOpen ? "me-3" : "mx-auto"}`}
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  {isOpen && <span>{item.name}</span>}
                </button>
              ) : (
                <Link
                  to={item.path}
                  title={!isOpen ? item.name : undefined}
                  className="nav-link py-3"
                  style={{
                    borderRadius: "0",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      location.pathname === item.path ? colors.active : "transparent",
                    color: colors.text,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      location.pathname === item.path ? colors.active : colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      location.pathname === item.path ? colors.active : "transparent")
                  }
                >
                  <i
                    className={`bi ${item.icon} ${isOpen ? "me-3" : "mx-auto"}`}
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  {isOpen && <span>{item.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
        >
          <div
            className="bg-white rounded p-4"
            style={{ minWidth: "300px", maxWidth: "90%" }}
          >
            <h5>Confirm Logout</h5>
            <p>Are you sure you want to log out?</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
