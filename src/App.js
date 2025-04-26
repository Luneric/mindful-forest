import React, { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState({}); // Store users {username: password}
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [spotifyLink, setSpotifyLink] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (accounts[username] && accounts[username] === password) {
      setLoggedInUser(username);
    } else {
      alert("Invalid login! Please check your username/password.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (accounts[username]) {
      alert("Account already exists!");
    } else {
      setAccounts({ ...accounts, [username]: password });
      setLoggedInUser(username);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername("");
    setPassword("");
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

  // Automatically convert spotify link to embed
  const getEmbedLink = (link) => {
    if (!link.includes("/embed/")) {
      return link.replace("open.spotify.com", "open.spotify.com/embed");
    }
    return link;
  };

  return (
    <div className="App">
      <div className="overlay">
        {!loggedInUser ? (
          <div className="login-signup-form">
            <h2>Welcome to Mindful Forest</h2>

            <form onSubmit={handleLogin}>
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
              <div className="button-group">
                <button type="submit">Log In</button>
                <button type="button" onClick={handleSignup}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dashboard">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>

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
                  <span
                    key={face}
                    onClick={() => setMood(face)}
                    style={{ cursor: "pointer", fontSize: "2rem", margin: "0.2rem" }}
                  >
                    {face}
                  </span>
                ))}
              </div>
              <p>Your last mood: {todayEntry.mood || mood}</p>
              <button onClick={handleSaveEntry}>Save Entry</button>
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
              {spotifyLink && (
                <iframe
                  src={getEmbedLink(spotifyLink)}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                  style={{ borderRadius: "12px", marginTop: "1rem" }}
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;