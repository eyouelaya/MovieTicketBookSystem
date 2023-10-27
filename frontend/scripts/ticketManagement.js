// Function to populate the table with tickets
const populateTable = (tickets) => {
    const ticketTable = document.getElementById('ticketTable');
    ticketTable.innerHTML = `
        <tr>
            <th>Ticket Code</th>
            <th>Movie Name</th>
            <th>Running Time</th>
            <th>Movie Date</th>
            <th></th>
        </tr>
    `;

    tickets.forEach((ticket) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket._id}</td>
            <td>${ticket.movieName}</td>
            <td>${ticket.runningTime}</td>
            <td>${new Date(ticket.movieDate).toLocaleDateString()}</td>
            <td class="action-buttons">
                <button class="edit-button" onclick="editTicket('${ticket._id}')">Edit</button>
                <button class="delete-button" onclick="deleteTicket('${ticket._id}')">Delete</button>
            </td>
        `;
        ticketTable.appendChild(row);
    });
};

// Function to fetch and display all tickets
const getTickets = () => {
    fetch('http://localhost:3000/tickets')
        .then((response) => response.json())
        .then((tickets) => {
            populateTable(tickets);
        })
        .catch((error) => {
            console.error(error);
        });
};

// Function to search for tickets
const searchTicket = () => {
    const searchInput = document.getElementById('searchInput').value;
    const response= fetch(`http://localhost:3000/tickets/${searchInput}`)
    .then((response) => {
        if (!response.ok) {
            // Handle the case where the ticket is not found
            alert('ticket number: '+searchInput+' not found');
        } else {
            return response.json();
        }
    })
        .then((tickets) => {
            populateTable([tickets]);
        })
        .catch((error) => {
            console.error(error);
        });
};

// Function to delete a ticket
const deleteTicket = (ticketId) => {
    fetch(`http://localhost:3000/tickets/${ticketId}`, {
        method: 'DELETE',
    })
        .then(() => {
            getTickets();
        })
        .catch((error) => {
            console.error(error);
        });
};

// Function to edit a ticket
const editTicket = (ticketId) => {
    // Redirect to the edit page with the selected ticketId or implement an edit form in this page.
    window.location.href = `edit-ticket.html?ticketId=${ticketId}`;
};

// Event listeners
document.getElementById('searchButton').addEventListener('click', searchTicket);

// Initial load of tickets
//getTickets();