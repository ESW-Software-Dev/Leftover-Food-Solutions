import React, { useState, useEffect } from 'react';
import '../App.css';

const Home = () => {
  const [testMessage, setTestMessage] = useState("None");

  function callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setTestMessage(res))
      .catch(err => setTestMessage("ERROR"));
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Leftover Food Solutions</h1>
      <p>Find and share leftover food around campus!</p>
    </div>
  );
};

export default Home;




