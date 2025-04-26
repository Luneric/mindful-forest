import React, { useState } from "react";
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

  React.useEffect(() => {
    const savedData = localStorage.getItem("calendarData");
    if (savedData) {
      setCalendarData(JSON.parse(savedData));
    }
  }, []);
  
  React.useEffect(() => {
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
              <p>Be kind to yourself. 💖</p>
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
