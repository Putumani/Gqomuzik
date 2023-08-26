import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS audios (
    id INTEGER PRIMARY KEY,
    artist TEXT,
    songName TEXT,
    fileName TEXT,
    url TEXT,
    songImage BLOB
  )`);
});

const insertAudio = (artist: string, songName: string, fileName: string, url: string, songImage: ArrayBuffer) => {
  const insertQuery = `INSERT INTO audios (artist, songName, fileName, url, songImage) VALUES (?, ?, ?, ?, ?)`;
  db.run(insertQuery, [artist, songName, fileName, url, songImage]);
};

export {
  insertAudio,
};


