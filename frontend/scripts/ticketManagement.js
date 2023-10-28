// Store a Set to keep track of displayed ticket codes
const displayedTicketCodes = new Set();
window.onload = async function () {
  const params = new URLSearchParams(window.location.search);

  if (params.has("id")) {
    const response = await fetch(`http://localhost:3000/tickets/${id}`);
    if (response.ok) {
      let ticket = await response.json();
      populateTable(ticket);
    }
  }
};

// Function to populate the table with tickets, checking if it has been displayed
const populateTable = (ticket) => {
  const ticketTable = document.getElementById("ticketTable");

  if (!displayedTicketCodes.has(ticket.code)) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${ticket.code}</td>
            <td>${ticket.movieName}</td>
            <td>${ticket.runningTime}</td>
            <td>${ticket.movieDate}</td>
            <td class="action-buttons">
                <button class="edit-button" onclick="editTicket('${ticket.code}')">Edit</button>
                <button class="delete-button" onclick="deleteTicket('${ticket.code}')">Delete</button>
            </td>
        `;
    ticketTable.appendChild(row);
    displayedTicketCodes.add(ticket.code);
  }
};

// Function to fetch and display all tickets
async function getTickets() {
  const response = await fetch("http://localhost:3000/tickets");
  if (response.ok) {
    let ticket = await response.json();
    populateTable(ticket);
  }
}

// Function to search for tickets
async function searchTicket() {
  const searchInput = document.getElementById("searchInput").value;
  const response = await fetch(`http://localhost:3000/tickets/${searchInput}`);
  if (!response.ok) {
    // Handle the case where the ticket is not found
    alert("ticket number: " + searchInput + " not found");
  } else {
    let ticket = await response.json();
    if (!ticket.movieName) return;
    populateTable(ticket);
  }
}

// Function to delete a ticket
async function deleteTicket(ticketId) {
  const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Ticket deleted successfully!");
    // Find and remove the table row for the deleted ticket
    const ticketTable = document.getElementById("ticketTable");
    const rows = ticketTable.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      if (cells.length > 0 && cells[0].textContent === ticketId) {
        ticketTable.deleteRow(i);
        break; // Exit the loop since we found and removed the row
      }
    }
  } else {
    alert("Failed to delete ticket.");
  }
}

// Function to edit a ticket
async function editTicket(ticketId) {
  window.open("ticketEdit.html?id=" + ticketId);
}

// Event listeners
document.getElementById("searchButton").addEventListener("click", searchTicket);
