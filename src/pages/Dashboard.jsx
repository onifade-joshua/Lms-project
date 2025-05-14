import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const stats = [
    { title: "Users", value: "1,254", icon: "bi-people", color: "primary" },
    { title: "Revenue", value: "$13,245", icon: "bi-currency-dollar", color: "success" },
    { title: "Tasks", value: "24", icon: "bi-list-check", color: "warning" },
    { title: "Pending", value: "8", icon: "bi-hourglass-split", color: "danger" }
  ];

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="content-wrapper" style={{ 
        marginLeft: sidebarOpen ? '250px' : '70px',
        width: `calc(100% - ${sidebarOpen ? '250px' : '70px'})`,
        transition: 'all 0.3s'
      }}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <main className="p-4" style={{ marginTop: '60px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Dashboard</h1>
            <button className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>
              New Project
            </button>
          </div>
          
          <div className="row g-3 mb-4">
            {stats.map((stat, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded me-3`}>
                      <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
                    </div>
                    <div>
                      <h6 className="card-subtitle text-muted mb-1">{stat.title}</h6>
                      <h2 className="card-title mb-0">{stat.value}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row g-3">
            <div className="col-md-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Recent Activity</h5>
                  <div className="dropdown">
                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      This Week
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Today</a></li>
                      <li><a className="dropdown-item" href="#">This Week</a></li>
                      <li><a className="dropdown-item" href="#">This Month</a></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Project</th>
                          <th scope="col">Status</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Website Redesign</td>
                          <td><span className="badge bg-success">Completed</span></td>
                          <td>
                            <div className="progress" style={{ height: '6px' }}>
                              <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }}></div>
                            </div>
                          </td>
                          <td>May 1, 2025</td>
                        </tr>
                        <tr>
                          <td>Mobile App Development</td>
                          <td><span className="badge bg-warning text-dark">In Progress</span></td>
                          <td>
                            <div className="progress" style={{ height: '6px' }}>
                              <div className="progress-bar bg-warning" role="progressbar" style={{ width: '65%' }}></div>
                            </div>
                          </td>
                          <td>May 10, 2025</td>
                        </tr>
                        <tr>
                          <td>Database Migration</td>
                          <td><span className="badge bg-primary">Planning</span></td>
                          <td>
                            <div className="progress" style={{ height: '6px' }}>
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }}></div>
                            </div>
                          </td>
                          <td>May 15, 2025</td>
                        </tr>
                        <tr>
                          <td>API Integration</td>
                          <td><span className="badge bg-danger">Delayed</span></td>
                          <td>
                            <div className="progress" style={{ height: '6px' }}>
                              <div className="progress-bar bg-danger" role="progressbar" style={{ width: '35%' }}></div>
                            </div>
                          </td>
                          <td>May 8, 2025</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Upcoming Tasks</h5>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="task1" />
                          <label className="form-check-label" htmlFor="task1">
                            Team meeting
                          </label>
                        </div>
                        <small className="text-muted">Today, 2:00 PM</small>
                      </div>
                      <span className="badge bg-primary rounded-pill">High</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="task2" />
                          <label className="form-check-label" htmlFor="task2">
                            Project proposal
                          </label>
                        </div>
                        <small className="text-muted">Tomorrow, 9:00 AM</small>
                      </div>
                      <span className="badge bg-warning text-dark rounded-pill">Medium</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="task3" />
                          <label className="form-check-label" htmlFor="task3">
                            Client review
                          </label>
                        </div>
                        <small className="text-muted">May 8, 11:00 AM</small>
                      </div>
                      <span className="badge bg-success rounded-pill">Low</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="task4" />
                          <label className="form-check-label" htmlFor="task4">
                            Update documentation
                          </label>
                        </div>
                        <small className="text-muted">May 10, 3:00 PM</small>
                      </div>
                      <span className="badge bg-warning text-dark rounded-pill">Medium</span>
                    </li>
                  </ul>
                </div>
                <div className="card-footer bg-white text-center">
                  <button className="btn btn-sm btn-outline-primary">View All Tasks</button>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Team Members</h5>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'].map((name, index) => (
                      <li key={index} className="list-group-item d-flex align-items-center p-3">
                        <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3" 
                          style={{ width: '36px', height: '36px', overflow: 'hidden' }}>
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h6 className="mb-0">{name}</h6>
                          <small className="text-muted">{['Designer', 'Developer', 'Project Manager', 'Marketing'][index]}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;