// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkjQgdpugM0D3YWnoMNk1jBCwLpc46zkw",
  authDomain: "my-book-fb82e.firebaseapp.com",
  projectId: "my-book-fb82e",
  storageBucket: "my-book-fb82e.firebasestorage.app",
  messagingSenderId: "964682023167",
  appId: "1:964682023167:web:b6032419fb6783e6384cca",
  measurementId: "G-V79EY8FZWX"
};

// Auth state observer
auth.onAuthStateChanged(user => {
// update nav visibility on every page
const navDashboard = document.getElementById('nav-dashboard');
const logout = document.getElementById('logoutBtn');
if (user){
if (navDashboard) navDashboard.style.display = 'inline';
if (logout) logout.style.display = 'inline';
} else {
if (navDashboard) navDashboard.style.display = 'none';
if (logout) logout.style.display = 'none';
}


// Special: dashboard page logic
if (location.pathname.includes('dashboard.html')){
if (!user){
// redirect to login if not authenticated
location.href = 'login.html';
return;
}
// show user email
const userEmailEl = document.getElementById('userEmail');
if (userEmailEl) userEmailEl.textContent = user.email;
}
});


// If we're on index.html and logged in, change CTA
if (location.pathname.endsWith('index.html') || location.pathname === '/' ){
auth.onAuthStateChanged(user => {
const buyArea = document.getElementById('buy-area');
if (!buyArea) return;
if (user){
buyArea.innerHTML = `
<p>Welcome back, ${user.email} — <a class="btn" href="dashboard.html">Go to Dashboard</a></p>
`;
} else {
buyArea.innerHTML = `
<p>Want a copy? Create an account and then purchase.</p>
<a class="btn" href="signup.html">Create account</a>
`;
}
});
}