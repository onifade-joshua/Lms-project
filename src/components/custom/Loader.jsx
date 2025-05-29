import React from 'react';
import logo from '../assets/cu-logo.jpg'; 

const Loader = () => {
  return (
    <div className="dot-loader-wrapper">
      <div className="loader-content text-center">
        <img src={logo} alt="Logo" className="loader-logo mb-3" />
        <div className="dot-loader">Loading<span className="dot-anim">...</span></div>
      </div>

      <style jsx="true">{`
        .dot-loader-wrapper {
          height: 100vh;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', sans-serif;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loader-logo {
          width: 60px;
          height: auto;
        }

        .dot-loader {
          font-size: 1.5rem;
          font-weight: 600;
          color:rgb(164, 56, 179);
        }

        .dot-anim::after {
          content: '';
          display: inline-block;
          width: 1em;
          text-align: left;
          animation: dots 1.5s steps(3, end) infinite;
        }

        @keyframes dots {
          0%   { content: ''; }
          33%  { content: '.'; }
          66%  { content: '..'; }
          100% { content: '...'; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
