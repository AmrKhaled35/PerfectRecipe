const form = document.getElementById("signup-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("fullname-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    document.getElementById("password-error").innerHTML = "";

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if(fullname === "")
    {
        document.getElementById("fullname-error").innerHTML = "Please enter your full name";
        return ;
    }
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
    if(password === "" || confirmPassword === "")
    {
        document.getElementById("password-error").innerHTML = "Please enter your password";
        return ;
    }
    if(password !== confirmPassword){
        document.getElementById("password-error").innerHTML = "Password does not match";
        return ;
    }
    const data = {
        fullname: fullname,
        email: email,
        password: password,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "./Login.html";
});