window.onload = function () {
  display()
  dynamicButton()
}

function getToken() {
  const cookies = document.cookie.split(';')
  let token = null

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith('token=')) {
      token = cookie.substring(6)
      break
    }
  }

  return token
}

function dynamicButton() {
  const logOutButton = document.getElementById('logOutButton')
  if (getToken()) {
    logOutButton.textContent = 'Log Out' // Change the text
    logOutButton.href = 'login.html' // Change the href
  } else {
    logOutButton.textContent = 'Login' // Change the text to something else
    logOutButton.href = 'login.html' // Change the href to the login page or wherever you want
  }
}
const form = document.getElementById('uploadForm')
async function display() {
  let response = await fetch('http://localhost:3000/movies', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
      Authorization: document.cookie,
      Accept: 'application/json',
    },
  })
  let json
  if (response.ok) {
    json = await response.json()
    let movieList = document.getElementById('movieList')
    while (movieList.firstChild) {
      movieList.removeChild(movieList.firstChild)
    }
    for (let e of json) {
      addRowToTable(e._id, e.title)
    }
  } else alert('Authentication Error')
}

function addRowToTable(id, title) {
  let row = document.createElement('tr')

  row.setAttribute('id', id)
  for (let e of arguments) {
    let cell = document.createElement('td')
    cell.appendChild(document.createTextNode(e))
    row.appendChild(cell)
  }
  document.getElementById('movieList').appendChild(row)
}

document
  .getElementById('btnAddMovie')
  .addEventListener('click', async function (event) {
    event.preventDefault()

    async function post() {
      const formData = new FormData(form)

      try {
        const response = await fetch('http://localhost:3000/movies', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: document.cookie,
          },
        })

        if (response.ok) {
          const jsonResponse = await response.json()
          console.log(jsonResponse)

          form.reset()
        } else {
          console.error('Failed to upload the movie.')
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

    post()
  })

document
  .getElementById('btnDeleteMovie')
  .addEventListener('click', async (event) => {
    event.preventDefault()
    const movieId = document.getElementById('movieId').value
    await deleteMovieById(movieId)
  })

async function deleteMovieById(movieId) {
  const apiUrl = `http://localhost:3000/movies/${movieId}`

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: document.cookie,
      },
    })
    console.log(response.status)
    if (response.status === 200) {
      display()
      alert(`Movie with ID ${movieId} deleted successfully.`)
    } else if (response.status === 404) {
      alert('Movie not found')
    } else if (response.status === 401) {
      alert('Authorization required')
    } else if (response.status === 400) {
      alert('Invalid Id')
    }
  } catch (error) {
    console.log(error)
  }
}

document.getElementById('logOutButton').addEventListener('click', () => {
  document.cookie = 'token=; path=/;'
  window.location.href = 'login.html'
})

const editForm = document.getElementById('editForm')
document
  .getElementById('btnEditMovie')
  .addEventListener('click', async function (event) {
    event.preventDefault()

    async function edit() {
      const formData = new FormData(editForm)
      const movieId = document.getElementById('editId').value

      try {
        const response = await fetch(
          `http://localhost:3000/movies/${movieId}`,
          {
            method: 'PUT',
            body: formData,
            headers: {
              Authorization: document.cookie,
            },
          }
        )

        if (response.ok) {
          const jsonResponse = await response.json()
          alert('movie edited successfully')
          display()
          form.reset()
        } else {
          console.error('Failed to edit the movie.')
          alert('Failed to edit the movie.')
        }
      } catch (error) {
        alert('An error occurred:', error)
      }
    }

    edit()
  })
