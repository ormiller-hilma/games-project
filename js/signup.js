document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // runs after legal submition
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const user = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    console.log(user)

    doesUserExists = localStorage.getItem(user) !== null

    if (doesUserExists) {
      const userNameError = document.getElementById("username-error")
      userNameError.innerHTML = "שם המשתמש כבר תפוס"
      //alert("שם המשתמש כבר תפוס")
      return
    }
    if (password!==confirmPassword) {
      const passwordError = document.getElementById("password-error")
      passwordError.innerHTML = "הסיסמאות לא זהות"
      //alert("הסיסמאות לא זהות")
      return;
    }
    // saves user if user doesn't exist exists
    // user = key
    // password = value

    localStorage.setItem(user, password)
    window.location.href = "../html/games.html"
  });
