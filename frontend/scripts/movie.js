window.onload = function () {
  display();
};
const form = document.getElementById("uploadForm");
async function display() {
  let response = await fetch("http://localhost:3000/movies", {
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      Authorization: document.cookie,
      Accept: "application/json",
    },
  });
  let json;
  if (response.ok) {
    json = await response.json();
    for (let e of json) {
      addRowToTable(e._id, e.title);
    }
  } else alert("Authentication Error");
}

function addRowToTable(id, title) {
  let row = document.createElement("tr");
  row.setAttribute("id", id);
  for (let e of arguments) {
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(e));
    row.appendChild(cell);
  }
  document.getElementById("movieList").appendChild(row);
}

document
  .getElementById("btnAddMovie")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    async function post() {
      const formData = new FormData(form);

      try {
        const response = await fetch("http://localhost:3000/movies", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: document.cookie,
          },
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);

          form.reset();
        } else {
          console.error("Failed to upload the movie.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    post();
  });

document.getElementById("deleteForm").addEventListener("click", async () => {
  const movieId = document.getElementById("movieId").value;
  await deleteMovieById(movieId);
});

async function deleteMovieById(movieId) {
  const apiUrl = `http://localhost:3000/movies/${movieId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        Authorization: document.cookie,
        Accept: "application/json",
      },
    });
    if (response.status === 200) {
      console.log(`Movie with ID ${movieId} deleted successfully.`);
    } else if (response.status === 404) {
      console.error("Movie not found.");
    } else {
      console.error("Error deleting movie.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("logOutButton").addEventListener("click", () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "login.html";
});

const editForm = document.getElementById("editForm");
document
  .getElementById("btnEditMovie")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    async function edit() {
      const formData = new FormData(editForm);
      const movieId = document.getElementById("editId").value;

      try {
        const response = await fetch(
          `http://localhost:3000/movies/${movieId}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: document.cookie,
            },
          }
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);

          form.reset();
        } else {
          console.error("Failed to edit the movie.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    edit();
  });
