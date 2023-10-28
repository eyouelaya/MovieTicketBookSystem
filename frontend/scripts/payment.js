const payButton = document.getElementById('payButton')

payButton.addEventListener('click', async function (event) {
  event.preventDefault()
 // Check if required fields are empty
 const myform= document.getElementById("payment-form")
 if (!myform.checkValidity()) {
  return;
}
  const storedData = localStorage.getItem('ticketData')

  if (storedData) {
    const dataToPost = JSON.parse(storedData)

    const apiUrl = 'http://localhost:3000/tickets'

    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    })

    const data = await response.json()
    localStorage.setItem('ticketCodeData', JSON.stringify(data))
    window.location.href = 'ticket.html'
  } else {
    alert('No data found in storage to make a payment.')
  }
})
