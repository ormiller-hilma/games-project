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
      userNameError.innerHTML = "שם המשתמש לא קיים"
      return;
    }
    if (localStorage.getItem(user) === password) {
      // alert("הכל תקין! ההתחברות מתבצעת");
      window.location.href = "../html/games.html"
      return;
    }
    passwordError.innerHTML = "הסיסמא שגויה"
    //alert("הסיסמא שגויה");

  });

    const userNameError = document.getElementById("username-error")
    const passwordError = document.getElementById("password-error")
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    usernameInput.addEventListener("focus", function (){
      userNameError.innerHTML = ""
    })
    passwordInput.addEventListener("focus", function (){
      passwordError.innerHTML = ""
    })
