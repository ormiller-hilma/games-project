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
      //alert("שם המשתמש לא קיים");
      const userNameError = document.getElementById("username-error")
      userNameError.innerHTML = "שם המשתמש לא קיים"
      return;
    }
    if (localStorage.getItem(user) === password) {
      alert("הכל תקין! ההתחברות מתבצעת");
      window.location.href = "../html/games.html"
      return;
    }
    const passwordError = document.getElementById("password-error")
    passwordError.innerHTML = "הסיסמא שגויה"
    //alert("הסיסמא שגויה");

  });
