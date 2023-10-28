window.onload = function () {
  getMovies();
};
var movieCards = document.getElementsByClassName("movie-card");

for (var i = 0; i < movieCards.length; i++) {
  let movieBackground = document.getElementsByClassName("movie-background");
  let item = movieBackground[i];
  movieCards[i].addEventListener("mouseover", function () {
    item.style.filter = "brightness(0.6)";
  });

  // On mouse out
  movieCards[i].addEventListener("mouseout", function () {
    item.style.filter = "brightness(0.9)";
  });
}

document.getElementById("scroll-left").addEventListener("click", function () {
  var container = document.querySelector(".scrollable-movie-cards-today");
  container.scrollLeft -= 200; // Assuming each card is 200px wide
});

document.getElementById("scroll-right").addEventListener("click", function () {
  var container = document.querySelector(".scrollable-movie-cards-today");
  container.scrollLeft += 200; // Assuming each card is 200px wide
});

var movieCollection;
async function getMovies() {
  try {
    let response = await fetch("http://localhost:3000/movies");
    if (response.ok) {
      let movies = await response.json();
      console.log(movies);
      movieCollection = movies;
      loadMainCard(movies);
      loadMoviesToday(movies);
    }
  } catch (err) {
    console.log(err);
  }
}

function loadMainCard(movies) {
  const recent = movies.slice(movies.length - 4, movies.length);
  document.getElementById("mainCardImg1").src =
    "http://localhost:3000/" + recent[0]["imageLink"];
  document.getElementById("mainCardImg2").src =
    "http://localhost:3000/" + recent[1]["imageLink"];
  document.getElementById("mainCardImg3").src =
    "http://localhost:3000/" + recent[2]["imageLink"];
  document.getElementById("mainCardImg4").src =
    "http://localhost:3000/" + recent[3]["imageLink"];
  document.getElementById("mainCardtitle1").textContent = recent[0]["title"];
  document.getElementById("mainCardtitle2").textContent = recent[1]["title"];
  document.getElementById("mainCardtitle3").textContent = recent[2]["title"];
  document.getElementById("mainCardtitle4").textContent = recent[3]["title"];
  document.getElementById("mainCardTrailerLink1").href =
    recent[0]["trailerLink"];
  document.getElementById("mainCardTrailerLink2").href =
    recent[1]["trailerLink"];
  document.getElementById("mainCardTrailerLink3").href =
    recent[2]["trailerLink"];
  document.getElementById("mainCardTrailerLink4").href =
    recent[3]["trailerLink"];
  document.getElementById("mainCardBook1").value = recent[0]["_id"];
  document.getElementById("mainCardBook2").value = recent[1]["_id"];
  document.getElementById("mainCardBook3").value = recent[2]["_id"];
  document.getElementById("mainCardBook4").value = recent[3]["_id"];
}

function loadMoviesToday(movies) {
  const today = movies.slice(movies.length - 5, movies.length);
  for (let movie of today) {
    movie.imageLink = movie.imageLink.replace(/\\/g, "/");
  }
  document.getElementById("todayMovieTitle1").textContent = today[0]["title"];
  document.getElementById("todayMovieRuntime1").textContent =
    today[0]["runningTime"];
  document.getElementById("todayMovieImage1").style.backgroundImage =
    "url('http://localhost:3000/" + today[0]["imageLink"] + "')";
  document.getElementById("todayMovieTitle2").textContent = today[1]["title"];
  document.getElementById("todayMovieRuntime2").textContent =
    today[1]["runningTime"];
  document.getElementById("todayMovieImage2").style.backgroundImage =
    "url('http://localhost:3000/" + today[1]["imageLink"] + "')";
  document.getElementById("todayMovieTitle3").textContent = today[2]["title"];
  document.getElementById("todayMovieRuntime3").textContent =
    today[1]["runningTime"];
  document.getElementById("todayMovieImage3").style.backgroundImage =
    "url('http://localhost:3000/" + today[2]["imageLink"] + "')";
  document.getElementById("todayMovieTitle4").textContent = today[3]["title"];
  document.getElementById("todayMovieRuntime4").textContent =
    today[1]["runningTime"];
  document.getElementById("todayMovieImage4").style.backgroundImage =
    "url('http://localhost:3000/" + today[3]["imageLink"] + "')";
  document.getElementById("todayMovieTitle5").textContent = today[4]["title"];
  document.getElementById("todayMovieRuntime5").textContent =
    today[1]["runningTime"];
  document.getElementById("todayMovieImage5").style.backgroundImage =
    "url('http://localhost:3000/" + today[4]["imageLink"] + "')";

  document
    .getElementById("todayCardBook1")
    .setAttribute("value", today[0]["_id"]);
  document
    .getElementById("todayCardBook2")
    .setAttribute("value", today[1]["_id"]);
  document
    .getElementById("todayCardBook3")
    .setAttribute("value", today[2]["_id"]);
  document
    .getElementById("todayCardBook4")
    .setAttribute("value", today[3]["_id"]);
  document
    .getElementById("todayCardBook5")
    .setAttribute("value", today[4]["_id"]);
}

function loadLastestRelease(movies) {
  console.log(movies.length);
  const recent = movies.slice(movies.length, movies.length);
}

const modal = document.getElementById("movieModal");
const closeBtn = document.getElementsByClassName("close-btn")[0];

document.getElementById("mainCardBook1").addEventListener("click", (event) => {
  modal.style.display = "block";
  movie = movieCollection.filter((m) => m._id == event.target.value);
  setValueToModal(movie);
});
document.getElementById("mainCardBook2").addEventListener("click", (event) => {
  modal.style.display = "block";
  movie = movieCollection.filter((m) => m._id == event.target.value);
  setValueToModal(movie);
});
document.getElementById("mainCardBook3").addEventListener("click", (event) => {
  modal.style.display = "block";
  movie = movieCollection.filter((m) => m._id == event.target.value);
  setValueToModal(movie);
});
document.getElementById("mainCardBook4").addEventListener("click", (event) => {
  modal.style.display = "block";
  movie = movieCollection.filter((m) => m._id == event.target.value);
  setValueToModal(movie);
});

document.getElementById("todayCardBook1").addEventListener("click", (event) => {
  // event.preventDefault();
  modal.style.display = "block";
  movie = movieCollection.filter(
    (m) => m._id == event.currentTarget.getAttribute("value")
  );
  console.log();
  setValueToModal(movie);
});

document.getElementById("todayCardBook2").addEventListener("click", (event) => {
  // event.preventDefault();
  modal.style.display = "block";
  movie = movieCollection.filter(
    (m) => m._id == event.currentTarget.getAttribute("value")
  );
  console.log();
  setValueToModal(movie);
});
document.getElementById("todayCardBook3").addEventListener("click", (event) => {
  // event.preventDefault();
  modal.style.display = "block";
  movie = movieCollection.filter(
    (m) => m._id == event.currentTarget.getAttribute("value")
  );
  console.log();
  setValueToModal(movie);
});
document.getElementById("todayCardBook4").addEventListener("click", (event) => {
  // event.preventDefault();
  modal.style.display = "block";
  movie = movieCollection.filter(
    (m) => m._id == event.currentTarget.getAttribute("value")
  );
  console.log();
  setValueToModal(movie);
});
document.getElementById("todayCardBook5").addEventListener("click", (event) => {
  // event.preventDefault();
  modal.style.display = "block";
  movie = movieCollection.filter(
    (m) => m._id == event.currentTarget.getAttribute("value")
  );
  console.log();
  setValueToModal(movie);
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function setValueToModal(movie) {
  console.log(movie);
  console.log("http://localhost:3000/" + movie[0].imageLink);
  document.getElementById("modalMovieImage").src =
    "http://localhost:3000/" + movie[0].imageLink;
  console.log(movie[0].title);
  document.getElementById("modalMovieName").textContent = movie[0].title;
  document.getElementById("modalReleaseDate").textContent = parseDate(
    movie[0].releaseDate
  );
  document.getElementById("modalRuntime").textContent = movie[0].runningTime;
  document.getElementById("modalGenre").textContent = movie[0].genre;
  document.getElementById("modalAboutMovie").textContent = movie[0].description;
  document.getElementById("modalMovieTrailer").href = movie[0].trailerLink;
  document.getElementById("modalbookMovie").value = movie[0]._id;
}

document.getElementById("modalbookMovie").addEventListener("click", (event) => {
  window.open("pages/booking.html?id=" + event.target.value, "_blank");
});

function parseDate(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-based
  return `${year}-${month.toString().padStart(2, "0")}`;
}
