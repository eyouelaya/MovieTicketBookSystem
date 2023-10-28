document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  login(email, password);
});

async function login(email, password) {
  console.log("fet");
  let response = await fetch("http://127.0.0.1:3000/auth/login", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: { "Content-type": "application/json", Accept: "application/json" },
  });
  if (response.ok) {
    window.location.href = "movie.html";
  } else {
    console.log("Error" + response.status);
  }
}
