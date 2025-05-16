const form = document.getElementById("signin-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("email-error").innerHTML = "";
    document.getElementById("password-error").innerHTML = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "") {
        document.getElementById("email-error").innerHTML = "Please enter your email";
        return;
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
        return;
    }

    if (password === "") {
        document.getElementById("password-error").innerHTML = "Please enter your password";
        return;
    }

    try {
        const response = await fetch("https://omarsaberawad.pythonanywhere.com/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            console.log(data);
            localStorage.setItem("Token" , data.access);
            window.location.href = "../Landing/Landing.html"; 
        } else {
            document.getElementById("password-error").innerHTML = data.detail || "Invalid email or password";
        }

    } catch (error) {
        document.getElementById("password-error").innerHTML = "Something went wrong. Please try again.";
    }
});
