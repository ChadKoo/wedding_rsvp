// pages/api/attendees/[id].js

let attendees = require('../../../data/db.json');  // Adjust the path to your db.json

export default async (req, res) => {
  const { id } = req.query; // Get the attendee ID from the URL query

  switch (req.method) {
    case 'GET':
      // Find the attendee by ID
      const attendee = attendees.find((attendee) => attendee.id === id);
      if (attendee) {
        res.status(200).json(attendee);
      } else {
        res.status(404).json({ error: 'Attendee not found' });
      }
      break;

    case 'DELETE':
      // Find the index of the attendee by ID
      const index = attendees.findIndex((attendee) => attendee.id === id);
      if (index !== -1) {
        // Remove the attendee from the array
        attendees.splice(index, 1);

        // Normally, you would persist the data to a database here
        res.status(200).json({ success: true, message: 'Attendee deleted' });
      } else {
        res.status(404).json({ error: 'Attendee not found' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
};
