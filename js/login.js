document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // runs after legal submition
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const user = usernameInput.value;
    const password = passwordInput.value;

    //console.log(user);

    doesUserExists = localStorage.getItem(user) !== null;

    if (doesUserExists === false) {
      alert("Username does not exist");
      return;
    }
    if (localStorage.getItem(user) === password) {
      alert("Correct! loging in");
      return;
    }

    alert("Password is inccorect");

  });
