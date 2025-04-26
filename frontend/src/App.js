import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./App.css";

function App() {
  const DEMO_USERNAME = "demo";
  const DEMO_PASSWORD = "password123";
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [spotifyLink, setSpotifyLink] = useState("");

  // ✨ NEW: Large list of affirmations
  const affirmations = [
  "You are enough. 💖",
  "You are stronger than you think. 💪",
  "Every day is a fresh start. 🌱",
  "Your kindness is a gift to the world. 🌸",
  "Believe in yourself and all that you are. 🌟",
  "You deserve all the happiness in the world. ✨",
  "Rest is essential for growth. 🌙",
  "You are worthy of love and respect. 💫",
  "You have the power to create positive change. 🌍",
  "Take a deep breath, and just be. 🌿",
  "Your efforts today create the world you want tomorrow. 🌞",
  "You are capable of achieving great things. 🌻",
  "The universe supports your dreams. ✨",
  "Choose joy every day. 🌼",
  "You are your own greatest strength. 💪",
  "You radiate positivity. ✨",
  "Your potential is limitless. 🚀",
  "You are deserving of all the good things coming your way. 🌺",
  "You have everything you need within you. 🌟",
  "Let go of what you can't control. 🌿",
  "You are making progress, no matter how small. 🌱",
  "You are a beautiful work in progress. 🎨",
  "Today, you are one step closer to your dreams. 🌈",
  "Your inner peace is a powerful force. 🕊️",
  "You are the architect of your own happiness. 🏗️",
  "Your thoughts create your reality. 🌌",
  "You are deserving of love and compassion. 💖",
  "You are capable of handling anything life throws at you. ⚡",
  "You are a unique and valuable person. 🌟",
  "You are deserving of rest and relaxation. 🛀",
  "You are in charge of your own happiness. 😊",
  "You are a beautiful soul, inside and out. 💫",
  "Every challenge is an opportunity for growth. 🌻",
  "You are worthy of all the best life has to offer. ✨",
  "Today, you choose to be happy. 🌞",
  "Your life is filled with endless possibilities. 🌍",
  "You attract love, peace, and abundance. 💖",
  "You are becoming the best version of yourself. 🌟",
  "You are enough, just as you are. 💕",
  "Your courage is stronger than any fear. 🦁",
  "You are a magnet for positivity and light. 🌟",
  "You have the power to create your own happiness. ✨",
  "Your journey is unique and beautiful. 🌻"
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  useEffect(() => {
    const savedData = localStorage.getItem("calendarData");
    if (savedData) {
      setCalendarData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
       setLoggedIn(true);
       setErrorMessage("");
    } 
    else {
        setErrorMessage("Incorrect username or password. Please try again!");
    }
  };

  const handleSaveEntry = () => {
    const key = selectedDate.toDateString();
    setCalendarData({ ...calendarData, [key]: { mood, journal } });
    setMood("");
    setJournal("");
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const todayEntry = calendarData[selectedDate.toDateString()] || {};

  const changeAffirmation = () => {
    // Randomly select an affirmation from the list
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className="App">
      <div className="overlay">
        {!loggedIn ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
        ) : (
          <div className="dashboard">
            <h1>Mindful Forest</h1>
            <p>A calm space for your soul</p>

            <div className="section">
              <h2>🌞 Your Daily Affirmation</h2>
              <p>{currentAffirmation}</p> {/* Display the current affirmation */}
              <button onClick={changeAffirmation}>Affirmations</button> {/* Button to change */}
            </div>

            <div className="section">
              <h2>🌈 How are you feeling today?</h2>
              <div className="emojis">
                {["🙂", "😕", "😄", "😉", "😌"].map((face) => (
                  <span key={face} onClick={() => setMood(face)} style={{ cursor: "pointer", fontSize: "2rem", margin: "0.2rem" }}>
                    {face}
                  </span>
                ))}
              </div>
              <p>Your last mood: {todayEntry.mood || mood}</p>
            </div>

            <div className="section">
              <h2>📔 Journal It Out</h2>
              <textarea
                placeholder="Write your thoughts here..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
              />
              <button onClick={handleSaveEntry}>Save Entry</button>
            </div>

            <div className="section">
              <h2>📅 Your Calendar</h2>
              <Calendar onClickDay={handleDateClick} />
              {todayEntry && (
                <div className="entry-details">
                  <h3>Entry for {selectedDate.toDateString()}</h3>
                  <p><strong>Mood:</strong> {todayEntry.mood}</p>
                  <p><strong>Journal:</strong> {todayEntry.journal}</p>
                </div>
              )}
            </div>

            <div className="section">
              <h2>🎵 Your Playlist</h2>
              <input
                type="text"
                placeholder="Enter Spotify playlist link"
                value={spotifyLink}
                onChange={(e) => setSpotifyLink(e.target.value)}
              />
              
              {spotifyLink && spotifyLink.includes("open.spotify.com") ? (
                <iframe
                  src={spotifyLink.replace("open.spotify.com/", "open.spotify.com/embed/")}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                  style={{ borderRadius: "12px", marginTop: "1rem" }}
                ></iframe>
              ) : spotifyLink ? (
                <p style={{ color: "red", marginTop: "1rem" }}>❌ Please enter a valid Spotify link!</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
