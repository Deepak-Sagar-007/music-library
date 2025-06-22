import React, { useState } from 'react';
import './MusicLibrary.css'; 

export default function MusicLibrary({ user }) {
const [songs, setSongs] = useState([
  { title: 'Believer', artist: 'Imagine Dragons', album: 'Evolve' },
  { title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide' },
  { title: 'Thunder', artist: 'Imagine Dragons', album: 'Evolve' },
  { title: 'Perfect', artist: 'Ed Sheeran', album: 'Divide' },
  { title: 'Senorita', artist: 'Shawn Mendes', album: 'Romance' },

  { title: 'Bad Liar', artist: 'Imagine Dragons', album: 'Origins' },
  { title: 'Photograph', artist: 'Ed Sheeran', album: 'x' },
  { title: 'Treat You Better', artist: 'Shawn Mendes', album: 'Illuminate' },
  { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia' },
  { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
  { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy' },
  { title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours' },
  { title: 'Don’t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia' },
  { title: 'In the End', artist: 'Linkin Park', album: 'Hybrid Theory' },
  { title: 'Numb', artist: 'Linkin Park', album: 'Meteora' }
]);

  const [filterText, setFilterText] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [newSong, setNewSong] = useState({ title: '', artist: '', album: '' });

  const handleAddSong = () => {
    if (newSong.title && newSong.artist && newSong.album) {
      setSongs([...songs, newSong]);
      setNewSong({ title: '', artist: '', album: '' });
    }
  };

  const handleDeleteSong = (indexToDelete) => {
    setSongs(songs.filter((_, index) => index !== indexToDelete));
  };

  // Filter
  let filtered = songs.filter(song =>
    song.title.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort
  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  return (
    <div className="music-library-container">
      <h2>🎵 Music Library</h2>
      <p>Welcome, <strong>{user?.username}</strong> ({user?.role})</p>

      <div className="filter-section">
        <input
          type="text"
          className="input-field"
          placeholder="Search by title"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <select className="input-field" onChange={(e) => setGroupBy(e.target.value)}>
          <option value="">No Group</option>
          <option value="artist">Group by Artist</option>
          <option value="album">Group by Album</option>
        </select>

        <select className="input-field" onChange={(e) => setSortBy(e.target.value)}>
          <option value="">No Sort</option>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
        </select>
      </div>

      {user?.role === 'admin' && (
        <div className="add-song-section">
          <input
            type="text"
            className="input-field"
            placeholder="Song Title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Album"
            value={newSong.album}
            onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
          />
          <button onClick={handleAddSong} className="add-button">+ Add Song</button>
        </div>
      )}

      <div className="song-grid">
        {filtered.map((song, idx) => (
          <div className="song-card" key={idx}>
            <div className="song-icon">🎵</div>
            <div className="song-info">
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
              <p className="album-text">{song.album}</p>
            </div>
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDeleteSong(idx)}
                className="delete-button"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
