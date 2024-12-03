import React from 'react';
import '../../App.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          This website was created as part of LeftoverFoodSolutions, a sub-team within Engineers For A Sustainable World. At Cornell University, numerous clubs and organizations regularly host events with food and drinks. Often, these events end with leftover food that needs to be distributed. Our platform aims to address this issue by promoting leftover food from campus events. By doing so, we aim to tackle both food insecurity and waste on campus.
          Through our platform, students can easily share leftover food from events or meetings using either the mobile app or web interface. Other students can then effortlessly find available options through this platform. This will allow leftover food to be used up by students who want it, fostering sustainability on campus.
        </p>
      </div>

      <div className="about-section">
        <h2>Cornell's Food Waste: Statistics</h2>
        <p>
          Every week, Cornell University generates two tons of wasted food, which is equivalent to approximately 8,000 meals. So, as a campus, we waste 8,000 meals every single week. Annually, Cornell dining halls and small eateries across campus produce 800 tons of food scraps and organic kitchen waste. These numbers highlight the scale of food waste on campus, which is why it is so important to implement strategies to minimize waste.
        </p>
      </div>

      <div className="about-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          {['TM1', 'TM2', 'TM3', 'TM4'].map((image, index) => (
            <div className="team-member" key={index}>
              <img
                src={`src/pages/AboutPage/Images/${image}.jpg`}
                alt={`Team Member ${index + 1}`}
                className="team-image"
              />
              <p className="team-name">{['Nadia Wong', 'Ethan Lin', 'Sennet Senadheera', 'Krishna Patel'][index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;


