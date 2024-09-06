import React from 'react';
import ReactDOM from 'react-dom';
import Logo from "../components/Logo.jsx";
import './AboutPage.css';

const About = () => {
  return (
    <div className="about-page"> { }
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>This website was created as a part of LeftoverFoodSolutions, a sub-team within Engineers For A Sustainable World. At Cornell University, numerous clubs and organizations regularly host events with food and drinks. Often, these events end with leftover food that needs to be distributed. Our platform aims to address this issue by promoting leftover food from campus events. By doing so, we aim to tackle both food insecurity and waste on campus.

          Through our platform, students can easily share leftover food from events or meetings using either the mobile app or web interface. Other students can then effortlessly find available options through this platform. This will allow leftover food to be used up by students who want it, fostering sustainability on campus.</p>
      </div>

      <div className="about-section">
        <h2>Cornell's Food Waste: Statistics</h2>
        <p>Every week, Cornell University generates two tons of wasted food, which is equivalent to approximately 8,000 meals. So, as a campus, we waste 8,000 meals every single week. Annually, Cornell dining halls and small eateries across campus produce 800 tons of food scraps and organic kitchen waste. These numbers highlight the scale of food waste on campus, which is why it is so important to implement strategies to minimize waste. </p>
      </div>
      <div className="about-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="src/pages/Images/TM1.jpg" />
            <p>Nadia Wong, CS '24</p>
          </div>
          <div className="team-member">
            <img src="src/pages/Images/TM2.jpg" />
            <p>Ethan Lin, CS '26</p>
          </div>
          <div className="team-member">
            <img src="src/pages/Images/TM3.jpg" />
            <p>Sennet Senadheera, CS '26</p>
          </div>
          <div className="team-member">
            <img src="src/pages/Images/TM4.jpg" />
            <p>Krishna Patel, CS '26</p>
          </div>
          <div className="team-member">
            <img src="src/pages/Images/TM5.jpg" />
            <p>Brandon Lerit, CS '26</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;