import React from 'react';
import './Loader.css'; // Import the CSS for styling

const Loader = () => {
  return (
    <div className="loader-container w-full h-full dark:bg-dark-background bg-primary-foreground">
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;