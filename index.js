// Variables referring to form and attendees list
const rsvpForm = document.getElementById('rsvpForm');
const attendeesList = document.getElementById('attendees');

// Handle form submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevents page reload

    // Get input values using FormData
    const formData = new FormData(rsvpForm);
    const fullName = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    

    // Basic validation to ensure no fields are empty
    if (!fullName || !address || !phone) {
        alert("Please fill in all the fields.");
        return;
    }

    // Prepare data to send to the server
    const attendeeData = {
        fullName: fullName,
        address: address,
        phone: phone
    };

    // Send the data to the server using fetch POST
    fetch('http://localhost:3000/attendees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendeeData) // Convert object to JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);

        // Create a new list item with the attendee's full name and a cancel button
        const attendeeItem = document.createElement('li');
        attendeeItem.textContent = fullName;

        // Create a cancel button for this attendee
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancelBtn');
        cancelButton.addEventListener('click', () => cancelReservation(data.id));

        // Append the cancel button to the list item
        attendeeItem.appendChild(cancelButton);

        // Append the new item to the attendees list
        attendeesList.appendChild(attendeeItem);

        // Reset the form fields after submission
        rsvpForm.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(`There was an error submitting the form: ${error.message}`);
    });
});

// Function to cancel a reservation
function cancelReservation(attendeeId) {
    // Send a DELETE request to remove the attendee from the mock server
    fetch(`http://localhost:3000/attendees/${attendeeId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        // If successful, remove the attendee's item from the list
        const attendeeItem = document.querySelector(`li[data-id="${attendeeId}"]`);
        attendeeItem.remove();
        console.log(`Attendee with ID ${attendeeId} removed`);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(`There was an error canceling the reservation: ${error.message}`);
    });
}

// Load existing attendees from the mock server on page load
window.addEventListener('load', () => {
    fetch('http://localhost:3000/attendees')
        .then(response => response.json())
        .then(data => {
            data.forEach(attendee => {
                // Create a list item with the attendee's full name and a cancel button
                const attendeeItem = document.createElement('li');
                attendeeItem.textContent = attendee.fullName;

                // Create a cancel button for this attendee
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.classList.add('cancelBtn');
                cancelButton.addEventListener('click', () => cancelReservation(attendee.id));

                // Append the cancel button to the list item
                attendeeItem.appendChild(cancelButton);

                // Store the attendee's id as a data attribute
                attendeeItem.setAttribute('data-id', attendee.id);

                // Append the new item to the attendees list
                attendeesList.appendChild(attendeeItem);
            });
        })
        .catch(error => {
            console.error('Error loading attendees:', error);
        });
});
