const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    message.textContent = "Login successful! 🎉";

    loginForm.reset();

    setTimeout(() => {
        window.location.href = "../html%20site/index.html";
    }, 1000);

    togglePassword.textContent = "👁";
    passwordInput.type = "password";
});
