const storedData = localStorage.getItem('ticketCodeData')

if (storedData) {
  // Parse the data back to an object
  const ticketData = JSON.parse(storedData)

  // Update the HTML elements with the data
  const movieTitleElement = document.querySelector('.movie-title')
  movieTitleElement.textContent = ticketData.movieName

  const showInfoElement = document.querySelector('.show-info')
  showInfoElement.textContent = `Date: ${ticketData.movieDate}`

  const bookingCodeElement = document.querySelector('.booking-code')
  bookingCodeElement.textContent = `Booking Code: ${ticketData.code}`

  const moviePosterImage = document.querySelector('.header img')
  moviePosterImage.src = ticketData.image
} else {
  // Handle the case where data is not available in localStorage
  console.log('Data not found in localStorage.')
}
