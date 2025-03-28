// pages/api/attendees/index.js

let attendees = require('../../../data/db.json');  // Adjust the path to your db.json

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      // Return the full list of attendees
      res.status(200).json(attendees);
      break;
      
    case 'POST':
      // Add a new attendee to the list
      const { fullName, address, phone } = req.body;

      // Generate a new ID for the attendee (could be more complex in real apps)
      const newAttendee = { id: Date.now().toString(), fullName, address, phone };
      attendees.push(newAttendee);

      // Normally you would persist the data to a database here
      // For simplicity, we're keeping it in memory

      res.status(201).json(newAttendee);
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
};
