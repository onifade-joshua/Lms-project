import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail') || 'user@example.com';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm py-2 px-3" style={{ 
      position: 'fixed', 
      top: 0, 
      right: 0, 
      left: sidebarOpen ? '250px' : '70px',
      zIndex: 1000,
      transition: 'left 0.3s'
    }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="btn d-md-none" onClick={toggleSidebar}>
            <i className="bi bi-list fs-5"></i>
          </button>
          <div className="input-group d-none d-md-flex ms-2" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control border-start-0 bg-light" placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown me-3">
            <button className="btn position-relative" type="button" data-bs-toggle="dropdown">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">New message</a></li>
              <li><a className="dropdown-item" href="#">Task reminder</a></li>
              <li><a className="dropdown-item" href="#">System update</a></li>
            </ul>
          </div>
          
          <div className="dropdown">
            <button className="btn d-flex align-items-center" type="button" data-bs-toggle="dropdown">
              <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2" 
                style={{ width: '32px', height: '32px', overflow: 'hidden' }}>
                <i className="bi bi-person-fill"></i>
              </div>
              <span className="d-none d-md-block">{email}</span>
              <i className="bi bi-chevron-down ms-1"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;