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

document
  .getElementById("scroll-left-latest")
  .addEventListener("click", function () {
    var container = document.querySelector(".scrollable-movie-cards-latest");
    container.scrollLeft -= 500; // Assuming each card is 200px wide
  });

document
  .getElementById("scroll-right-latest")
  .addEventListener("click", function () {
    var container = document.querySelector(".scrollable-movie-cards-latest");
    container.scrollLeft += 500; // Assuming each card is 200px wide
  });

async function getMovies() {
  try {
    let response = await fetch("http://localhost:3000/movies");
    if (response.ok) {
      let movies = await response.json();
      console.log(movies);
      loadMainCard(movies);
      loadMoviesToday(movies);
    }
  } catch (err) {
    console.log(err);
  }
}

function loadMainCard(movies) {
  const recent = movies.slice(movies.length - 5, movies.length - 1);
  console.log(recent);

  console.log("http://localhost:3000/" + recent[0]["imageLink"]);
  document.getElementById("mainCardImg1").src =
    "http://localhost:3000/" + recent[0]["imageLink"];
  document.getElementById("mainCardImg2").src =
    "http://localhost:3000/" + recent[1]["imageLink"];
  document.getElementById("mainCardImg3").src =
    "http://localhost:3000/" + recent[2]["imageLink"];
  document.getElementById("mainCardImg4").src =
    "http://localhost:3000/" + recent[3]["imageLink"];
  console.log(document.getElementById("mainCardtitle1"));
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
}

function loadMoviesToday(movies) {
  console.log(movies.length);
  const recent = movies.slice(movies.length - 6, movies.length - 1);
}

function loadLastestRelease(movies) {
  console.log(movies.length);
  const recent = movies.slice(movies.length, movies.length - 1);
}
