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
      userNameError.innerHTML = "שם המשתמש כבר תפוס"
      //alert("שם המשתמש כבר תפוס")
      return
    }
    if (password!==confirmPassword) {
      passwordError.innerHTML = "הסיסמאות לא זהות"
      //alert("הסיסמאות לא זהות")
      return;
    }
    // saves user if user doesn't exist exists
    // user = key
    // password = value

    localStorage.setItem(user, password)
    localStorage.setItem("username", user)
    alert("הכל תקין! ההרשמה מתבצעת");
    console.log(localStorage.key)
    window.location.href = "../html/games.html"
  });

    const userNameError = document.getElementById("username-error")
    const passwordError = document.getElementById("password-error")
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    usernameInput.addEventListener("focus", function (){
      userNameError.innerHTML = ""
    })
    passwordInput.addEventListener("focus", function (){
      passwordError.innerHTML = ""
    })
    confirmPasswordInput.addEventListener("focus", function (){
      passwordError.innerHTML = ""
    })