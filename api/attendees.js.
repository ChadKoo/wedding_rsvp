// api/attendees.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // The path to your db.json file
  const filePath = path.resolve(__dirname, '../db.json');

  // Read the db.json file and return its contents
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading the database file' });
      return;
    }

    const db = JSON.parse(data);
    res.status(200).json(db.attendees);  // Send attendees data
  });
};