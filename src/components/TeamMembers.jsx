import React from "react";

const TeamMembers = () => {
  return (
    <div>
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Team Members</h5>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis"].map(
              (name, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center p-3"
                >
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      overflow: "hidden",
                    }}
                  >
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h6 className="mb-0">{name}</h6>
                    <small className="text-muted">
                      {
                        [
                          "Designer",
                          "Developer",
                          "Project Manager",
                          "Marketing",
                        ][index]
                      }
                    </small>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
