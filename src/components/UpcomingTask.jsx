import React from "react";

const UpcomingTask = () => {
  return (
    <div>
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Upcoming Tasks</h5>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="task1"
                  />
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="task2"
                  />
                  <label className="form-check-label" htmlFor="task2">
                    Project proposal
                  </label>
                </div>
                <small className="text-muted">Tomorrow, 9:00 AM</small>
              </div>
              <span className="badge bg-warning text-dark rounded-pill">
                Medium
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="task3"
                  />
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="task4"
                  />
                  <label className="form-check-label" htmlFor="task4">
                    Update documentation
                  </label>
                </div>
                <small className="text-muted">May 10, 3:00 PM</small>
              </div>
              <span className="badge bg-warning text-dark rounded-pill">
                Medium
              </span>
            </li>
          </ul>
        </div>
        <div className="card-footer bg-white text-center">
          <button className="btn btn-sm btn-outline-primary">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
