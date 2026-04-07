// Initialize Firebase in the browser using the compat SDK loaded by HTML.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVw7uM6oJUTX76XINUGdWcKtftZxrYY88",
  authDomain: "my-book-ce2a2.firebaseapp.com",
  projectId: "my-book-ce2a2",
  storageBucket: "my-book-ce2a2.firebasestorage.app",
  messagingSenderId: "373685498615",
  appId: "1:373685498615:web:83e271f781c946d137d9f2",
  measurementId: "G-V3ZQRNMQQ9"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginMessage = document.getElementById("loginMessage");
  const signupMessage = document.getElementById("signupMessage");
  const userEmailSpan = document.getElementById("userEmail");
  const paypalCustom = document.getElementById("paypalCustom");
  const navDashboard = document.getElementById("nav-dashboard");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtnTop = document.getElementById("logoutBtnTop");

  const showMessage = (element, text) => {
    if (element) {
      element.textContent = text;
    }
  };

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      showMessage(loginMessage, "");

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          showMessage(loginMessage, error.message || "Login failed.");
        });
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      showMessage(signupMessage, "");

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          showMessage(signupMessage, error.message || "Signup failed.");
        });
    });
  }

  const handleLogout = () => {
    auth.signOut().catch(() => {
      alert("Sign out failed.");
    });
  };

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      handleLogout();
    });
  }

  if (logoutBtnTop) {
    logoutBtnTop.addEventListener("click", (event) => {
      event.preventDefault();
      handleLogout();
    });
  }

  auth.onAuthStateChanged((user) => {
    const loggedIn = !!user;
    if (navDashboard) {
      navDashboard.style.display = loggedIn ? "" : "none";
    }
    if (logoutBtn) {
      logoutBtn.style.display = loggedIn ? "" : "none";
    }
    if (logoutBtnTop) {
      logoutBtnTop.style.display = loggedIn ? "" : "none";
    }
    if (userEmailSpan && user) {
      userEmailSpan.textContent = user.email;
    }
    if (paypalCustom && user) {
      paypalCustom.value = user.uid;
    }

    const path = window.location.pathname.split("/").pop();
    if (!loggedIn && path === "dashboard.html") {
      window.location.href = "login.html";
    }
    if (loggedIn && (path === "login.html" || path === "signup.html")) {
      window.location.href = "dashboard.html";
    }
  });
});

