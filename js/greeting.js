const greet = document.getElementById("greeting")
greet.innerHTML = localStorage.getItem("username") + " ,שלום"