/* =========================
   CONTACT FORM
========================= */

const form =
  document.getElementById("contactForm");

const email =
  document.getElementById("email");

const emailError =
  document.getElementById("emailError");

const formStatus =
  document.getElementById("formStatus");


function getResponses() {

  return JSON.parse(
    localStorage.getItem("contactResponses") || "[]"
  );

}


function validEmail(value) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}


form.addEventListener("submit", function(event) {

  event.preventDefault();

  emailError.textContent = "";
  formStatus.textContent = "";


  if (!validEmail(email.value.trim())) {

    emailError.textContent =
      "Please enter a valid email address.";

    email.focus();

    return;

  }


  const response = {

    name:
      document.getElementById("name")
      .value
      .trim(),

    email:
      email.value
      .trim(),

    message:
      document.getElementById("message")
      .value
      .trim(),

    timestamp:
      new Date().toLocaleString()

  };


  const responses =
    getResponses();


  responses.push(response);


  localStorage.setItem(
    "contactResponses",
    JSON.stringify(responses)
  );


  form.reset();


  formStatus.textContent =
    "✓ Message submitted successfully!";

});



/* =========================
   ADMIN LOGIN
========================= */

const loginBtn =
  document.getElementById("loginBtn");


loginBtn.addEventListener(
  "click",
  function() {

    const username =
      document
      .getElementById("username")
      .value
      .trim();


    const password =
      document
      .getElementById("password")
      .value;


    const loginStatus =
      document.getElementById(
        "loginStatus"
      );


    if (
      username === "admin" &&
      password === "1234"
    ) {

      document
      .getElementById("loginBox")
      .classList
      .add("hidden");


      document
      .getElementById("responses")
      .classList
      .remove("hidden");


      loginStatus.textContent = "";


      showResponses();

    }

    else {

      loginStatus.textContent =
        "Invalid username or password.";

    }

  }
);



function showResponses() {

  const box =
    document.getElementById(
      "responses"
    );


  const responses =
    getResponses();


  if (responses.length === 0) {

    box.innerHTML =
      "<p>No responses submitted yet.</p>";

    return;

  }


  box.innerHTML =
    responses
    .map(function(response) {

      return `

        <div class="response">

          <h3>
            ${escapeHTML(response.name)}
          </h3>

          <small>
            ${escapeHTML(response.email)}
            ·
            ${escapeHTML(response.timestamp)}
          </small>

          <p>
            ${escapeHTML(response.message)}
          </p>

        </div>

      `;

    })
    .join("");

}



function escapeHTML(value) {

  return String(value)
    .replace(
      /[&<>"']/g,
      function(character) {

        return {

          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"

        }[character];

      }
    );

}



/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle =
  document.getElementById(
    "themeToggle"
  );


const savedTheme =
  localStorage.getItem("theme");


if (savedTheme === "light") {

  document.body
    .classList
    .add("light");

  themeToggle.textContent = "🌙";

}


themeToggle.addEventListener(
  "click",
  function() {

    document.body
      .classList
      .toggle("light");


    const isLight =
      document.body
      .classList
      .contains("light");


    localStorage.setItem(
      "theme",
      isLight
        ? "light"
        : "dark"
    );


    themeToggle.textContent =
      isLight
        ? "🌙"
        : "☀️";

  }
);



/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById(
    "menuToggle"
  );


const navMenu =
  document.getElementById(
    "navMenu"
  );


menuToggle.addEventListener(
  "click",
  function() {

    navMenu
      .classList
      .toggle("open");

  }
);


document
  .querySelectorAll("nav a")
  .forEach(function(link) {

    link.addEventListener(
      "click",
      function() {

        navMenu
          .classList
          .remove("open");

      }
    );

  });



/* =========================
   SCROLL ANIMATION
========================= */

const observer =
  new IntersectionObserver(
    function(entries) {

      entries.forEach(
        function(entry) {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("visible");

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(
    ".section-reveal"
  )
  .forEach(function(element) {

    observer.observe(element);

  });



/* =========================
   SCROLL PROGRESS BAR
========================= */

window.addEventListener(
  "scroll",
  function() {

    const scrollTop =
      window.scrollY;


    const documentHeight =
      document.documentElement
      .scrollHeight -
      document.documentElement
      .clientHeight;


    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;


    document
      .getElementById(
        "progressBar"
      )
      .style
      .width =
      progress + "%";

  }
);