import React from "react";

const RecentActivity = () => {
  return (
    <div>
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Recent Activity</h5>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              This Week
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Today
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  This Week
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  This Month
                </a>
              </li>
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
                  <td>
                    <span className="badge bg-success">Completed</span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </td>
                  <td>May 1, 2025</td>
                </tr>
                <tr>
                  <td>Mobile App Development</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      In Progress
                    </span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </td>
                  <td>May 10, 2025</td>
                </tr>
                <tr>
                  <td>Database Migration</td>
                  <td>
                    <span className="badge bg-primary">Planning</span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </td>
                  <td>May 15, 2025</td>
                </tr>
                <tr>
                  <td>API Integration</td>
                  <td>
                    <span className="badge bg-danger">Delayed</span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "35%" }}
                      ></div>
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
  );
};

export default RecentActivity;
