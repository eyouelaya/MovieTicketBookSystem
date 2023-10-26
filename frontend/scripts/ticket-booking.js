const timeSlotsContainer = document.getElementById('time-slots')

const startTime = 8
const endTime = 18

const interval = 1

for (let i = startTime; i < endTime; i += interval) {
  const timeSlot = document.createElement('div')
  timeSlot.className = 'col-md-2 p-3'
  const time =
    i % 12 === 0 ? '12:00 PM' : `${i % 12}:00 ${i < 12 ? 'AM' : 'PM'}`

  const timeBox = document.createElement('div')
  timeBox.className = 'time-box'
  timeBox.textContent = time

  timeSlot.appendChild(timeBox)

  timeSlotsContainer.appendChild(timeSlot)
}

const dateSlotsContainer = document.getElementById('date-slots')

function getNext8Days() {
  const days = []
  const today = new Date()

  for (let i = 0; i < 8; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push(date)
  }

  return days
}

const daysOfWeek = getNext8Days()

for (let i = 0; i < 7; i++) {
  const dateSlot = document.createElement('div')
  dateSlot.className = 'col-md-3 p-3'

  const carouselCell = document.createElement('div')
  carouselCell.className = 'carousel-cell'

  const date = document.createElement('div')
  date.className = 'date-numeric'
  date.textContent = daysOfWeek[i + 1].getDate()

  const dayOfWeek = document.createElement('div')
  dayOfWeek.className = 'date-day'
  dayOfWeek.textContent = daysOfWeek[i + 1].toLocaleString('en-US', {
    weekday: 'long',
  })

  carouselCell.appendChild(date)
  carouselCell.appendChild(dayOfWeek)
  dateSlot.appendChild(carouselCell)

  dateSlotsContainer.appendChild(dateSlot)
}

let selectedDate = null
let selectedTime = null

const timeBoxes = document.querySelectorAll('.time-box')

timeBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    timeBoxes.forEach((item) => item.classList.remove('selected'))

    box.classList.add('selected')
    selectedTime = box.textContent
    updateButtonState()
  })
})

const dateCells = document.querySelectorAll('.carousel-cell')

dateCells.forEach((cell) => {
  cell.addEventListener('click', () => {
    dateCells.forEach((item) => item.classList.remove('selected'))

    cell.classList.add('selected')
    selectedDate = cell.querySelector('.date-numeric').textContent
    updateButtonState()
  })
})

function updateButtonState() {
  if (selectedDate && selectedTime) {
    selectButton.classList.remove('disabled')
    selectButton.disabled = false
  } else {
    selectButton.classList.add('disabled')
    selectButton.disabled = true
  }
}
