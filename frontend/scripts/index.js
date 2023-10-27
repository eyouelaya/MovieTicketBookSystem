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
}

function loadMoviesToday(movies) {
  const today = movies.slice(movies.length - 6, movies.length - 1);
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
}

function loadLastestRelease(movies) {
  console.log(movies.length);
  const recent = movies.slice(movies.length, movies.length - 1);
}

//search function
document
  .getElementById("searchMovies")
  .addEventListener("input", function (event) {
    // Get the current value of the input field
    const inputValue = event.target.value;

    // Now you can use inputValue, which will contain the text as it's being entered
    console.log("Current input:", inputValue);
  });
