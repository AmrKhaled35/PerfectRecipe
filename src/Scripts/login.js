const form = document.getElementById("signin-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    document.getElementById("email-error").innerHTML = "";
    document.getElementById("password-error").innerHTML = "";

    const email = document.getElementById("email").value;
    if(email === "")
    {
        document.getElementById("email-error").innerHTML = "Please enter your email";
        return ;
    }
    let atIdx = 0;
    let dotIdx = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
            atIdx = i;
        } else if (email[i] === ".") {
            dotIdx = i;
        }
    }
    if (!(atIdx > 0 && dotIdx > 0 && atIdx < dotIdx)) {
        document.getElementById("email-error").innerHTML = "Please enter a valid email";
        return ;
    }
    const password = document.getElementById("password").value;
    if(password === "")
    {
        document.getElementById("password-error").innerHTML = "Please enter your password";
        return ;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "./Pages/Landing/Landing.html";
    } else {
        document.getElementById("password-error").innerHTML = "Invalid email or password";
    }
});