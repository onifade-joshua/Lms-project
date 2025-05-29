import React from "react";

const StatsCards = () => {
  const stats = [
    { title: "Users", value: "1,254", icon: "bi-people", color: "primary" },
    { title: "Revenue", value: "$13,245", icon: "bi-currency-dollar", color: "success" },
    { title: "Tasks", value: "24", icon: "bi-list-check", color: "warning" },
    { title: "Pending", value: "8", icon: "bi-hourglass-split", color: "danger" },
  ];

  return (
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
  );
};

export default StatsCards;