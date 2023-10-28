document.getElementById("themeSwitcher").addEventListener("click", (event) => {
  event.preventDefault();
  let theme = event.currentTarget.getAttribute("value");
  if (theme === "dark") {
    document.documentElement.style.setProperty("--color-black", "white");
    document.documentElement.style.setProperty("--color-white", "black");
    document.documentElement.style.setProperty("--color-yellow", "#c5cf88");
    document.documentElement.style.setProperty(
      "--color-dark-yellow",
      "#f6ff7a"
    );
    event.currentTarget.setAttribute("value", "light");
  } else {
    document.documentElement.style.setProperty("--color-black", "black");
    document.documentElement.style.setProperty("--color-white", "white");
    document.documentElement.style.setProperty("--color-yellow", "#f6ff7a");
    document.documentElement.style.setProperty(
      "--color-dark-yellow",
      "#c5cf88"
    );
    event.currentTarget.setAttribute("value", "dark");
  }
  console.log(event.currentTarget.getAttribute("value"));
});

console.log(document.getElementById("themeSwitcher"));
