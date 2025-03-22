const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Open or create SQLite database
const db = new sqlite3.Database('./project_briefs.db', (err) => {
  if (err) {
    console.error('Failed to open the database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create table for project briefs if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS project_briefs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    techStack TEXT NOT NULL,
    goals TEXT NOT NULL
  );
`);

// Route to get all project briefs
app.get('/api/project-brief', (req, res) => {
  const sql = 'SELECT * FROM project_briefs';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({
      message: "Project briefs fetched successfully!",
      data: rows,
    });
  });
});

// Route to delete a project by ID
app.delete('/api/project-brief/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM project_briefs WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete the project' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ message: 'Project deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
