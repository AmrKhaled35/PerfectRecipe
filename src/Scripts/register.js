const form = document.getElementById("signup-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("fullname-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    document.getElementById("password-error").innerHTML = "";

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const is_superuser = document.getElementById("isAdmin").checked;

    if (fullname === "") {
        document.getElementById("fullname-error").innerHTML = "Please enter your full name";
        return;
    }

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

    if (password.length < 8) {
        document.getElementById("password-error").innerHTML = "Password must be at least 8 characters long";
        return;
    }

    let upperCase = false;
    let lowerCase = false;
    let number = false;
    let specialChar = false;
    for (let i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
            upperCase = true;
        } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
            lowerCase = true;
        } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
            number = true;
        } else {
            specialChar = true;
        }
    }

    if (!upperCase) {
        document.getElementById("password-error").innerHTML = "Password must contain at least one uppercase letter";
        return;
    }
    if (!lowerCase) {
        document.getElementById("password-error").innerHTML = "Password must contain at least one lowercase letter";
        return;
    }
    if (!number) {
        document.getElementById("password-error").innerHTML = "Password must contain at least one number";
        return;
    }
    if (!specialChar) {
        document.getElementById("password-error").innerHTML = "Password must contain at least one special character";
        return;
    }

    if (confirmPassword === "") {
        document.getElementById("password-error").innerHTML = "Please confirm your password";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("password-error").innerHTML = "Password does not match";
        return;
    }

    const data = {
        username: fullname,
        email: email,
        password: password,
        isAdmin: is_superuser
    };

    try {
        const response = await fetch("https://omarsaberawad.pythonanywhere.com/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();

        if (response.ok) {
            window.location.href = "./Login.html";
        } else {
            document.getElementById("fullname-error").innerHTML = "";
            document.getElementById("email-error").innerHTML = "";
            document.getElementById("password-error").innerHTML = "";

            for (const key in resData) {
                if (resData.hasOwnProperty(key)) {
                    const errorMessages = resData[key];
                    if (key === "email") {
                        document.getElementById("email-error").innerHTML = errorMessages.join("<br>");
                    } else if (key === "username") {
                        document.getElementById("fullname-error").innerHTML = errorMessages.join("<br>");
                    } else if (key === "password") {
                        document.getElementById("password-error").innerHTML = errorMessages.join("<br>");
                    } else {
                        document.getElementById("password-error").innerHTML = errorMessages.join("<br>");
                    }
                }
            }

            if (resData.detail) {
                document.getElementById("password-error").innerHTML = resData.detail;
            }
        }
    } catch (error) {
        document.getElementById("password-error").innerHTML = "Something went wrong. Please try again.";
    }
});
