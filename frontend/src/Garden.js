import React, { useEffect, useState } from 'react';
import './Garden.css'; // We will create a separate CSS for the garden

const Garden = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Load the garden data from localStorage when the component mounts
    const savedPlants = JSON.parse(localStorage.getItem('plants')) || [];
    setPlants(savedPlants);
  }, []);

  const createPlant = () => {
    const plantTypes = ['sunflower', 'mushroom', 'willow'];
    const randomType = plantTypes[Math.floor(Math.random() * plantTypes.length)];

    // Add the new plant to the garden
    const newPlants = [...plants, randomType];
    setPlants(newPlants);

    // Save the updated garden in localStorage
    localStorage.setItem('plants', JSON.stringify(newPlants));
  };

  return (
    <div id="garden-container">
      <h2>Welcome to Your Garden 🌱</h2>
      <div id="garden" className="garden">
        {plants.map((plantType, index) => (
          <div key={index} className={`plant ${plantType}`} />
        ))}
      </div>
      <button id="plantSeedBtn" onClick={createPlant}>
        Plant a Thought
      </button>
    </div>
  );
};

export default Garden;