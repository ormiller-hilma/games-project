document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // runs after legal submition
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const user = usernameInput.value;
    const password = passwordInput.value;

    console.log(user)

    doesUserExists = localStorage.getItem(user) !== null

    if (doesUserExists) {
      alert("Username is already taken")
      return
    }
    // saves user if user doesn't exist exists
    // user = key
    // password = value

    localStorage.setItem(user, password)

  });
