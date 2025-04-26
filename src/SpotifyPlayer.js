// src/SpotifyPlayer.js
import React from 'react';

function SpotifyPlayer() {
  return (
    <div id="spotify" style={{ textAlign: 'center', margin: '2rem' }}>
      <h2 style={{ color: '#2e5d34' }}>Relax with Music</h2>
      <iframe
        style={{ borderRadius: '12px' }}
        src="https://open.spotify.com/embed/playlist/15rbkYonui609HyXZHRFur?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      ></iframe>
    </div>
  );
}

export default SpotifyPlayer;
