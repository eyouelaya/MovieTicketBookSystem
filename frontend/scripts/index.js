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
